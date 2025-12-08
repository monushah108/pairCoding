import { AnimatePresence, motion } from "motion/react";
import AutoColor from "./AutoColor";
import type React from "react";

interface ChatBubbleProps {
  content: string;
  name: string;
  time: string;
  theme: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  content,
  name,
  time,
  theme,
}) => {
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
        className="flex flex-col gap-1 mb-3"
      >
        <AutoColor name={name} time={time} />

        {theme == "simple" ? (
          <div className="text-[12px] dark:bg-[#2d2d30]  dark:text-[#cccccc] bg-accent px-2 py-2 rounded">
            {content}
          </div>
        ) : (
          <div className="text-[12px] text-[#cccccc] px-3 py-2 rounded bg-[#2d2d30] shadow-sm ">
            {content}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatBubble;
