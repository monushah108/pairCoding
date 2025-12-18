import SeparatorWithTime from "@/components/ui/sepraterWithtime";
import ChatInput from "../ui/ChatInput";
import ChatBubble from "../ui/ChatBubble";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import { io } from "socket.io-client";

export default function ChatWindow() {
  const time = new Date().toLocaleTimeString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col justify-between  h-full bg-gray-500/10">
      <ScrollArea.Root>
        <ScrollArea.Viewport className="p-3 ">
          {/* <ChatBubble time={time} content="lorem" name="monu" theme="simple" />
          <SeparatorWithTime label="Oct 30, 2025 — 09:45 AM" />
          <ChatBubble time={time} content="lorem" name="monu" theme="simple" /> */}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="flex select-none touch-none p-0.5 bg-[#252526]"
        >
          <ScrollArea.Thumb className="flex-1 bg-[#555] rounded" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>

      <ChatInput />
    </div>
  );
}
