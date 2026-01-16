import { createFileRoute } from "@tanstack/react-router";
import EditorSkeleton from "@/components/editor/Skeleton/codeWindowSkeleton";
import FileExploreSkeleton from "@/components/editor/Skeleton/FileExploreSkeleton";
import TerminalSkeleton from "@/components/editor/Skeleton/TerminalSkeleton";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import TabBar from "@/components/editor/TabBar";
import StatusBar from "@/components/editor/StatusBar";
const CodeWindow = lazy(() => import("@/components/editor/CodeWindow"));
const FileExplore = lazy(() => import("@/components/editor/FileExplore"));
const Terminal = lazy(() => import("@/components/editor/Terminal"));
const ChatBox = lazy(() => import("@/components/editor/ChatBox"));

export const Route = createFileRoute("/palyground")({
  component: RouteComponent,
});

function RouteComponent() {
  const [Chats, setChats] = useState(false);
  const [OpenTerminal, setOpenTerminal] = useState(false);
  const [OpenFilePanel, setOpenFilePanel] = useState(false);
  const [code, setCode] = useState(``);
  const [output, setOutput] = useState([]);
  const chatPanelRef = useRef<any>(null);
  const TerminalRef = useRef<any>(null);
  const FilePanelRef = useRef<any>(null);

  const handleChatToggle = () => {
    if (Chats) chatPanelRef.current?.collapse();
    else chatPanelRef.current?.expand();
    setChats(!Chats);
  };

  const handleTerminalToggle = () => {
    if (OpenTerminal) TerminalRef.current?.collapse();
    else TerminalRef.current?.expand();
    setOpenTerminal(!OpenTerminal);
  };

  const handleFileToggle = () => {
    if (OpenFilePanel) FilePanelRef.current?.collapse();
    else FilePanelRef.current?.expand();
    setOpenFilePanel(!OpenFilePanel);
  };

  useEffect(() => {
    chatPanelRef.current?.collapse();
    TerminalRef.current?.collapse();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-[#d4d4d4] overflow-hidden">
      <div
        id="header"
        className="h-[35px] bg-[#323233] border-b border-[#2d2d30] flex items-center p-2 px-3"
      >
        <div className="flex items-center  gap-1">
          <span className="bg-red-500 w-3 h-3 rounded-full"></span>
          <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
          <span className="bg-green-500 w-3 h-3 rounded-full"></span>
        </div>
        <h1
          className="flex-1 text-center text-sm"
          onClick={() => setChats(true)}
        >
          Collaborative Code Editor
        </h1>
      </div>

      <TabBar setOutput={setOutput} code={code} />

      <div className="flex-1 flex ">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            ref={FilePanelRef}
            defaultSize={25}
            maxSize={25}
            collapsible
            collapsedSize={0}
            onCollapse={() => setOpenFilePanel(false)}
            onExpand={() => setOpenFilePanel(true)}
          >
            <Suspense fallback={<FileExploreSkeleton />}>
              <FileExplore handleFileToggle={handleFileToggle} />
            </Suspense>
          </ResizablePanel>

          <ResizableHandle className="bg-[#2d2d30] hover:bg-blue-500 transition-colors duration-200" />

          <ResizablePanel defaultSize={60} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60}>
                <Suspense fallback={<EditorSkeleton />}>
                  <CodeWindow code={code} setCode={setCode} />
                </Suspense>
              </ResizablePanel>

              <ResizableHandle className="bg-[#2d2d30] hover:bg-blue-500 transition-colors duration-200" />

              <ResizablePanel
                ref={TerminalRef}
                defaultSize={30}
                collapsible
                collapsedSize={0}
                onCollapse={() => setOpenTerminal(false)}
                onExpand={() => setOpenTerminal(true)}
              >
                <Suspense fallback={<TerminalSkeleton />}>
                  <Terminal
                    handleTerminalToggle={handleTerminalToggle}
                    code={code}
                    output={output}
                    setOutput={setOutput}
                  />
                </Suspense>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle className="bg-[#2d2d30] hover:bg-blue-500 transition-colors duration-200" />

          <ResizablePanel
            ref={chatPanelRef}
            defaultSize={30}
            minSize={15}
            maxSize={30}
            collapsible
            collapsedSize={0}
            onCollapse={() => setChats(false)}
            onExpand={() => setChats(true)}
          >
            <ChatBox handleChatToggle={handleChatToggle} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <StatusBar
        handleChatToggle={handleChatToggle}
        handleTerminalToggle={handleTerminalToggle}
      />
    </div>
  );
}
