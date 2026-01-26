import AboutPeer from "@/components/chatRoom/AboutPeer";
import ChatHeader from "@/components/chatRoom/chatHeader";
import Chatmain from "@/components/chatRoom/chatMain";
import Resizable from "@/components/group/ui/resizable";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/@me/$private")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col justify-between h-full">
      <ChatHeader />

      <Resizable sidbar={<AboutPeer />}>
        <Chatmain />
      </Resizable>
    </div>
  );
}
