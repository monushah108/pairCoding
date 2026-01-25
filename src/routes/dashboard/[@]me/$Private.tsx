import AboutPeer from "@/components/chatRoom/AboutPeer";
import ChatHeader from "@/components/chatRoom/chatHeader";
import Chatmain from "@/components/chatRoom/chatMain";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/dashboard/@me/$private")({
  component: RouteComponent,
});

function RouteComponent() {
  const profileRef = useRef<HTMLDivElement | any>(null);
  const [showProfile, setshowProfile] = useState(false);

  const handlePofile = () => {
    if (showProfile) profileRef.current?.collapse();
    else profileRef.current?.expand();
    setshowProfile(!showProfile);
  };
  useEffect(() => {
    profileRef.current?.collapse();
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      <ChatHeader />

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={75}>
          <Chatmain />
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
          <AboutPeer />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
