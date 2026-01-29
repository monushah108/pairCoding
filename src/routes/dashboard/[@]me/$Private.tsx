import AboutPeer from "@/components/chatRoom/AboutPeer";
import ChatHeader from "@/components/chatRoom/chatHeader";
import Chatmain from "@/components/chatRoom/chatMain";
import Resizable from "@/components/group/ui/resizable";
import { initMessageSocket } from "@/store/feature/socketListner";
import { useAppDispatch } from "@/store/hook";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard/@me/$private")({
  component: RouteComponent,
});

function RouteComponent() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    initMessageSocket(dispatch);
  }, []);
  return (
    <div className="flex flex-col justify-between h-full">
      <ChatHeader />

      <Resizable sidbar={<AboutPeer />}>
        <Chatmain />
      </Resizable>
    </div>
  );
}
