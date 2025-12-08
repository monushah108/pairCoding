import ChatWindow from "./chatWindow";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import ServerHeader from "./ServerHeader";
import ServerSidebar from "./ServerSidebar";
import ServerUsersPanel from "./ServerUsersPanel";

export default function Server() {
  return (
    <section className="grid grid-cols-[200px_1fr] h-full">
      <ServerSidebar />
      <div className="flex flex-col row-span-3">
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
      </div>
    </section>
  );
}
