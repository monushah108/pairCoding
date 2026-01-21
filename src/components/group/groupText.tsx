import { useEffect, useRef, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import GroupHeader from "./groupHeader";
import GroupPanel from "./groupPanel";
import Chatmain from "../chatRoom/chatMain";

export default function GroupText() {
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
      <GroupHeader />

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
          <GroupPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
