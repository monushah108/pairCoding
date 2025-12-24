import { lazy, useEffect, useMemo, useRef, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MessageSquareMore } from "lucide-react";
import FriendsList from "./FriendsList";

const ChatWindow = lazy(() => import("@/components/dashborad/chatWindow"));
const DirectMsgSidebar = lazy(
  () => import("@/components/dashborad/DirectMsgSidebar")
);
const ProfilePanel = lazy(() => import("@/components/dashborad/ProfilePanel"));
const TopBar = lazy(() => import("@/components/dashborad/TopBar"));
import ChatHeader from "@/components/dashborad/ChatHeader.js";

import { GetAllFriends } from "../../api/Authapi.js";
import { OpenMsg } from "../../api/Chatapi.js";
import { socket } from "../../socket/socket.js";

export default function UserMe() {
  const [selectedTab, setTab] = useState("chat");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [Allfriends, setAllFriends] = useState([]);
  const [openChat, setOpenChat] = useState([]);

  const [showProfile, setshowProfile] = useState(false);
  const profileRef = useRef<any>(null);
  const [onlinseUsers, setonlinseUsers] = useState([]);
  const [userId, setUserId] = useState("");

  const publicSocket = socket("/");
  useEffect(() => {
    publicSocket.connect();

    publicSocket.on("user status", setonlinseUsers);

    fetchAllFriends();
    return () => {
      publicSocket.off("user status", setonlinseUsers);
    };
  }, []);

  async function fetchAllFriends() {
    try {
      const res = await GetAllFriends();
      setAllFriends(res);
    } catch (err: any) {
      console.log(err);
    }
  }

  const onlinseUserset = useMemo(() => new Set(onlinseUsers), [onlinseUsers]);

  const friends = useMemo(() => {
    return Allfriends.filter((friend) => friend.isChatting).map((friend) => ({
      ...friend,
      isOnline: onlinseUserset.has(friend._id),
    }));
  }, [Allfriends, onlinseUserset]);

  const handlePofile = () => {
    if (showProfile) profileRef.current?.collapse();
    else profileRef.current?.expand();
    setshowProfile(!showProfile);
  };

  useEffect(() => {
    profileRef.current?.collapse();
  }, [openChat]);

  const handleMsg = async (roomId, id) => {
    try {
      await OpenMsg({ roomId, action: true });
    } catch (err: any) {
      console.log(err);
    }
    handleChatUser(id);

    fetchAllFriends();
  };

  const closeChat = async (roomId: any) => {
    try {
      await OpenMsg({ roomId, action: false });
    } catch (err: any) {
      console.log(err);
    }
    fetchAllFriends();
    setIsChatOpen(false);
    setTab("friends");
  };

  const handleChatUser = (id: String) => {
    setOpenChat(friends.filter((user) => user._id == id));
    setUserId(id);
    setIsChatOpen(true);
    setTab("chat");
  };

  return (
    <main className="grid grid-cols-[220px_1fr] h-full">
      {/* Friend list */}
      <DirectMsgSidebar
        friends={friends}
        closeChat={closeChat}
        handleChatUser={handleChatUser}
      />

      {/* Chat or main frame */}
      <div className="flex flex-col justify-between h-full">
        {isChatOpen ? (
          <ChatHeader openChat={openChat} handlePofile={handlePofile} />
        ) : (
          <TopBar
            selectedTab={selectedTab}
            setTab={setTab}
            Allfriends={Allfriends}
          />
        )}
        {selectedTab == "chat" ? (
          isChatOpen ? (
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={75}>
                <ChatWindow userId={userId} />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel
                ref={profileRef}
                defaultSize={25}
                maxSize={30}
                collapsible
                collapsedSize={0}
                onCollapse={() => setshowProfile(false)}
                onExpand={() => setshowProfile(true)}
              >
                <ProfilePanel />
              </ResizablePanel>
            </ResizablePanelGroup>
          ) : (
            <div className="relative flex-1 flex items-center justify-center">
              <div className="flex items-center justify-center flex-col gap-2">
                <div className="rounded bg-primary/50 animate-bounce p-2 text-white">
                  <MessageSquareMore />
                </div>

                <p className="text-sm text-primary/50 font-semibold">
                  No Conversation yet!!
                </p>
              </div>
            </div>
          )
        ) : null}

        {selectedTab == "friends" && (
          <FriendsList handleMsg={handleMsg} Allfriends={Allfriends} />
        )}
      </div>
    </main>
  );
}
