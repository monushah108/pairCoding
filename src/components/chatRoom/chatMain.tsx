import { useLayoutEffect, useRef, useState } from "react";

import * as ScrollArea from "@radix-ui/react-scroll-area";

import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar.js";
import { Separator } from "../ui/separator.js";
import { motion } from "motion/react";

import ChatBubble from "./ui/ChatBubble.js";
import ChatInput from "./ui/ChatInput.js";

export default function Chatmain() {
  const [message, setmessage] = useState("");

  const profileRef = useRef<HTMLDivElement | any>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [AllMessage, setAllmessage] = useState([]);
  const [selectedText, setSelectedText] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [AllMessage.length]);

  // console.log(AllMsg, friends);

  return (
    <div className="flex flex-col justify-between  h-full bg-gray-500/10">
      <ScrollArea.Root>
        <ScrollArea.Viewport className="p-3 max-h-[770px]">
          <div className="flex  my-2 flex-col gap-4  ">
            <div className=" px-4 py-1  text-[10px]    ">
              <Avatar className="rounded-full  ">
                <AvatarImage
                  className="size-25 rounded-full"
                  src="https://api.dicebear.com/6.x/initials/svg?seed=m"
                />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
            </div>

            <div className=" italic font-medium  text-gray-500">
              {/* <h2 className="text-md text-gray-600">
                      {selectedProfile?.name}
                      <span className="ml-2 text-xs">
                        --
                        {selectedProfile?.nickName}
                      </span>
                    </h2>

                    <p className="font-semibold">
                      This is the begining of your direct message history with{" "}
                      {selectedProfile?.name}
                    </p> */}
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col relative">
            {/* {AllMsg.map(
                    ({
                      userId: senderId,
                      message,
                      createdAt: time,
                      _id,
                      name,
                      file,
                    }) => (
                      <ChatBubble
                        id={_id}
                        message={message}
                        friendId={selectedProfile?._id}
                        senderId={senderId}
                        name={name}
                        time={time}
                        file={file}
                        handleActions={handleActions}
                      />
                    ),
                  )} */}
            <motion.div layout ref={bottomRef} />
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className=" select-none touch-none p-0.5 bg-[#252526] hidden"
        >
          <ScrollArea.Thumb className="flex-1 bg-[#555] rounded" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>

      <ChatInput />
    </div>
  );
}
