import { lazy, useEffect, useMemo, useRef, useState } from "react";
import SeparatorWithTime from "@/components/ui/sepraterWithtime";

import ChatInput from "../ui/ChatInput";
import ChatBubble from "../ui/ChatBubble";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import ChatHeader from "@/components/dashborad/ChatHeader.js";
import * as ScrollArea from "@radix-ui/react-scroll-area";
const ProfilePanel = lazy(() => import("@/components/dashborad/ProfilePanel"));

import { socket } from "../../socket/socket.js";
import { GetMsgs, sendMsg } from "../../api/Chatapi.js";
import { useOutletContext, useParams } from "react-router-dom";

export default function ChatWindow() {
  const time = new Date().toLocaleTimeString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [msg, setMsg] = useState("");
  const [showProfile, setshowProfile] = useState(false);
  const profileRef = useRef<any>(null);
  // const [AllMsg, setMsgs] = useState([]);
  const AllMsg = [
    {
      content: "hii there",
      time,
      senderName: "sumit",
    },
    {
      content:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, magni? Laboriosam quis voluptatem laudantium, doloribus quasi possimus. Voluptates velit beatae itaque praesentium molestiae officia sed soluta culpa sint ut! Magnam?",
      time,
      reciverName: "monu",
    },
  ];

  const { roomId } = useParams();
  const { friends } = useOutletContext();

  const selectedProfile = friends.find((f) => f.roomId == roomId);

  const chat = socket("/Chat");

  useEffect(() => {
    chat.connect();

    // chat.emit("persnal:chat", { userId, msg });

    chat.on("persnal:chat", (msg) => {
      console.log(msg);
    });

    return () => {
      chat.off("persnal:chat");
    };
  }, []);

  useEffect(() => {
    fetchAllMsg();
  }, []);

  const fetchAllMsg = async () => {
    try {
      const res = await GetMsgs({ roomId });
      console.log(res);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendMsg({ roomId, message: msg });
      console.log(res);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handlePofile = () => {
    if (showProfile) profileRef.current?.collapse();
    else profileRef.current?.expand();
    setshowProfile(!showProfile);
  };

  useEffect(() => {
    profileRef.current?.collapse();
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      <ChatHeader
        handlePofile={handlePofile}
        selectedProfile={selectedProfile}
      />

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={75}>
          <div className="flex flex-col justify-between  h-full bg-gray-500/10">
            <ScrollArea.Root>
              <ScrollArea.Viewport className="p-3 ">
                <div className="flex items-center justify-center my-2 flex-col gap-4">
                  <div className="bg-white px-4 py-1 rounded text-[10px] shadow-xs font-semibold  ">
                    {time}
                  </div>
                  <div>
                    <p className="text-sm italic  font-medium text-gray-500">
                      ~ ~ New Messages ~ ~
                    </p>
                  </div>
                </div>
                <div className="flex flex-col relative">
                  {AllMsg.map(({ time, content, senderName, reciverName }) => (
                    <ChatBubble
                      time={time}
                      content={content}
                      senderName={senderName}
                      reciverName={reciverName}
                      theme="simple"
                    />
                  ))}
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                orientation="vertical"
                className="flex select-none touch-none p-0.5 bg-[#252526]"
              >
                <ScrollArea.Thumb className="flex-1 bg-[#555] rounded" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner />
            </ScrollArea.Root>

            <ChatInput setMsg={setMsg} msg={msg} handleSubmit={handleSubmit} />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          ref={profileRef}
          defaultSize={25}
          maxSize={30}
          collapsible
          collapsedSize={0}
          onCollapse={() => setshowProfile(false)}
          onExpand={() => setshowProfile(true)}
        >
          <ProfilePanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
