import { AnimatePresence, motion } from "motion/react";

import { MoreHorizontalIcon } from "lucide-react";

import { memo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FormatTime } from "@/util/feature";

const ChatBubble = memo(function ChatBubble({
  friendId,
  isDeleted,
  isEdited,
  message,
  senderId,
  msgId,
}) {
  const msgOption = ["Reply", "Delete", "Edit"];

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={msgId}
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
                    // onClick={() => handleActions(action, id, message, name)}
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
              {/* {FormatTime(time)} */}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

export default ChatBubble;
