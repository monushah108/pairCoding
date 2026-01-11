import {
  lazy,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
import { GetMsgs, EditMsg } from "../../api/Chatapi.js";
import { useOutletContext, useParams } from "react-router-dom";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar.js";
import { Separator } from "../ui/separator.js";
import { motion } from "motion/react";

export default function ChatWindow() {
  const [msg, setMsg] = useState("");
  const [showProfile, setshowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement | any>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [AllMsg, setMsgs] = useState([]);

  const [selectedText, setSelectedText] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [file, setFile] = useState(null);

  const { roomId } = useParams();
  const { friends } = useOutletContext();

  const selectedProfile = friends.find((f) => f.roomId == roomId);

  const chat = useMemo(() => socket("/chat"), []);

  const toUserId = selectedProfile?._id;

  useEffect(() => {
    chat.connect();

    chat.on("personal:chat:send", (data) => {
      setMsgs((pre) => [...pre, data]);
    });

    return () => {
      chat.off("personal:chat:send");
    };
  }, [roomId]);

  useEffect(() => {
    fetchAllMsg();
  }, [roomId]);

  const fetchAllMsg = async () => {
    try {
      const res = await GetMsgs({ roomId });
      setMsgs(res);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = selectedText?.id;
    if (msg) {
      chat.emit("personal:chat", {
        toUserId,
        message: msg,
        roomId,
        repliedTextId: id,
      });
    } else if (file) {
      const read = new FileReader();
      read.onload = () => {
        chat.emit("upload:file", {
          toUserId,
          message: msg,
          roomId,
          fileBuffer: read.result,
        });
      };
      read.readAsArrayBuffer(file);
    }

    fetchAllMsg();
    setMsg("");
    setFile("");
    setPreviewUrl("");
  };

  const handleActions = async (
    action: string,
    id: string,
    message: string,
    name: string
  ) => {
    if (action == "Reply") {
      setSelectedText({ id, message, name });
      return;
    }
    try {
      const res = await EditMsg({ action, id, roomId });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    fetchAllMsg();
  };

  const handlePofile = () => {
    if (showProfile) profileRef.current?.collapse();
    else profileRef.current?.expand();
    setshowProfile(!showProfile);
  };
  useEffect(() => {
    profileRef.current?.collapse();
  }, []);

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [AllMsg.length]);

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
                    <h2 className="text-md text-gray-600">
                      {selectedProfile?.name}
                      <span className="ml-2 text-xs">
                        --
                        {selectedProfile?.nickName}
                      </span>
                    </h2>

                    <p className="font-semibold">
                      This is the begining of your direct message history with{" "}
                      {selectedProfile?.name}
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col relative">
                  {AllMsg.map(
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
                    )
                  )}
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

            <ChatInput
              selectedText={selectedText}
              setSelectedText={setSelectedText}
              setMsg={setMsg}
              msg={msg}
              handleSubmit={handleSubmit}
              file={file}
              setFile={setFile}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
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
