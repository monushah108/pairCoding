import GroupHeader from "@/components/group/groupHeader";
import GroupPanel from "@/components/group/groupPanel";
import GroupSidebar from "@/components/group/groupSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/dashboard/group/$groupId")({
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
    <section className="grid grid-cols-[200px_1fr] h-full">
      <div className="flex flex-col ">
        <GroupSidebar />
      </div>
      <div className="flex flex-col justify-between h-full">
        <GroupHeader />

        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={75}>
            <Outlet />
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
    </section>
  );
}
