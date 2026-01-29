import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Resizable({ sidbar, children }) {
  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          // ref={panelRef}
          defaultSize={25}
          maxSize={30}
          collapsible
          collapsedSize={0}
        >
          {sidbar}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
