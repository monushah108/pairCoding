import { lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";

const DirectMsgSidebar = lazy(
  () => import("@/components/dashborad/DirectMsgSidebar")
);

import { GetAllFriends } from "../../api/Authapi.js";
import { OpenMsg } from "../../api/Chatapi.js";
import { socket } from "../../socket/socket.js";
import { Outlet, useNavigate } from "react-router-dom";

export default function UserMe() {
  const [Allfriends, setAllFriends] = useState([]);
  const [onlinseUsers, setonlinseUsers] = useState([]);
  const [selectedTab, setTab] = useState("chat");
  const [selectedProfile, setProfile] = useState(null);

  const navigate = useNavigate();

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
    setTab("friends");
  };

  const handleChatUser = (roomId) => {
    navigate(`${roomId}`);
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
      <Outlet context={{ Allfriends, handleMsg, friends }} />
    </main>
  );
}
