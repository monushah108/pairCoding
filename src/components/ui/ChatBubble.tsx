import { AnimatePresence, motion } from "motion/react";
import AutoColor from "./AutoColor";
import type React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "./button";

interface ChatBubbleProps {
  senderId: string;
  friendId: string;
  message: string;
  time: string;
  key: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  senderId,
  friendId,
  message,
  key,
  time,
}) => {
  const msgOption = ["React", "Reply", "Delete", "Edit"];

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
        key={key}
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
        <div
          className={`text-[10px] ${
            friendId == senderId ? "text-left" : "text-right"
          } `}
        >
          {formatTime(time)}
        </div>

        <div className="flex ">
          <div className={`${friendId == senderId ? "order-1" : "order-0"}`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {msgOption.map((option, i) => (
                  <DropdownMenuItem className="font-semibold text-xs" key={i}>
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="text-xs font-semibold dark:bg-[#2d2d30]  dark:text-[#cccccc] bg-white shadow px-2 py-2 rounded ">
            {message}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatBubble;
