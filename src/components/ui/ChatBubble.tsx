import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "./button";
import { memo, useEffect, useState } from "react";

interface ChatBubbleProps {
  senderId: string;
  friendId: string;
  message: string;
  time: string;
  id: number;
  name: string;
  handleActions: (action: any, id: any) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = memo(function ChatBubble({
  senderId,
  friendId,
  message,
  id,
  time,
  name,

  handleActions,
}) {
  const msgOption = ["Reply", "Delete", "Edit"];

  const formatTime = (date: string) => {
    const time = new Date(date);

    return time.toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={id}
        initial={{ x: 30, opacity: 0, scale: 0.95 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: -30, opacity: 0, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 15,

          mass: 0.8,
        }}
        className={`flex flex-col gap-1 mb-3   max-w-lg  ${
          friendId == senderId ? "self-start" : "self-end"
        }`}
      >
        <div className="flex ">
          <div className={`${friendId == senderId ? "order-1" : "order-0"}`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {msgOption.map((action, i) => (
                  <DropdownMenuItem
                    onClick={() => handleActions(action, id, message, name)}
                    className="font-semibold text-xs"
                    key={i}
                  >
                    {action}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div
            className={` 
               text-sm
             font-semibold dark:bg-[#2d2d30]  dark:text-[#cccccc] bg-white shadow px-2 py-2 rounded `}
          >
            {message}
            <div
              className={`text-[10px] text-gray-500 ${
                friendId == senderId ? "text-left" : "text-right"
              } `}
            >
              {formatTime(time)}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

export default ChatBubble;
