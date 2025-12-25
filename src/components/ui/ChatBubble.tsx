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
  content: string;
  name: string;
  time: string;
  theme: string;
  senderName: string;
  reciverName: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  content,
  name,
  time,
  senderName,
  reciverName,
}) => {
  const msgOption = ["React", "Reply", "Delete", "Edit"];
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={content + time}
        initial={{ x: 30, opacity: 0, scale: 0.95 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: -30, opacity: 0, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 15,
          mass: 0.8,
        }}
        className={`flex flex-col gap-1 mb-3   max-w-lg ${
          senderName && "self-start"
        } ${reciverName && "self-end"}`}
      >
        <div
          className={`text-[10px] ${senderName && "text-left"} ${
            reciverName && "text-right"
          } `}
        >
          {time}
        </div>

        <div className="flex ">
          <div className={`${reciverName ? "order-0" : "order-1"}`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {msgOption.map((option) => (
                  <DropdownMenuItem className="font-semibold text-xs">
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="text-xs font-semibold dark:bg-[#2d2d30]  dark:text-[#cccccc] bg-white shadow px-2 py-2 rounded ">
            {content}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatBubble;
