import { lazy, useEffect, useMemo, useState } from "react";
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

import { io } from "socket.io-client";

export default function UserMe() {
  const [selectedTab, setTab] = useState("chat");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const socket = useMemo(
    () =>
      io("http://localhost:4000", {
        withCredentials: true,
      }),
    []
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.emit("private message", {
      to: "693b09866490cf8c63c913b0",
      message: "Hello privately!",
    });

    socket.on("private message", (data) => {
      console.log("Private message from:", data.from, data.message);
    });

    return () => {
      socket.off("connect", (msg) => setMessage(msg));
    };
  }, []);

  return (
    <main className="grid grid-cols-[220px_1fr] h-full">
      {/* Friend list */}
      <DirectMsgSidebar />

      {/* Chat or main frame */}
      <div className="flex flex-col justify-between h-full">
        <TopBar selectedTab={selectedTab} setTab={setTab} />
        {selectedTab == "chat" ? (
          isChatOpen ? (
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={75}>
                <ChatWindow />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25} maxSize={30}>
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

        {selectedTab == "friends" && <FriendsList />}
      </div>
    </main>
  );
}
