import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

type PanelRef = {
  expand: () => void;
  collapse: () => void;
};

export default function Resizable({ sidbar, children }) {
  const panelRef = useRef<PanelRef | null>(null);
  const { sidePanel } = useSelector((state) => state.Room);

  useEffect(() => {
    if (sidePanel) panelRef.current?.expand();
    else panelRef.current?.collapse();
  }, [sidePanel]);

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          ref={panelRef}
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
