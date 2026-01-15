import ChatWindow from "./chatWindow";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import ServerHeader from "./ServerHeader";
import ServerSidebar from "./ServerSidebar";
import ServerUsersPanel from "./ServerUsersPanel";
import { useState } from "react";
import VoiceRoom from "./VoiceRoom";
import { Outlet } from "react-router-dom";

export default function Server() {
  const [openChannel, setOpenChannel] = useState<string>("general");

  return (
    <section className="grid grid-cols-[200px_1fr] h-full">
      <ServerSidebar
        setOpenChannel={setOpenChannel}
        openChannel={openChannel}
      />
      {/* <div className="flex flex-col row-span-3">
        <ServerHeader />
        <ResizablePanelGroup direction="horizontal" className="">
          <ResizablePanel defaultSize={75}>
            <ChatWindow />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={25} maxSize={30}>
            <ServerUsersPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div> */}

      <div className="flex flex-col row-span-3">
        <Outlet />
      </div>
    </section>
  );
}
