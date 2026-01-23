import {
  MessageSquareText,
  Mic,
  MicOff,
  Phone,
  ScreenShare,
  ScreenShareOff,
  Video,
  VideoOff,
  Volume2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group";
import VoiceRoom from "../chatRoom/VoiceRoom";

export default function GroupVoice() {
  const [isShare, setShare] = useState(false);
  const [isCallOff, setCallOff] = useState(false);
  const [isMicOff, setMicOff] = useState(false);
  const [joined, setJoined] = useState(false);
  const users = ["m"];

  return (
    <>
      {users.length ? (
        <div className="bg-black h-full text-white flex justify-between  flex-col  ">
          <div className="flex items-center justify-between mx-2 my-5 md:mx-4  ">
            <div className="font-semibold text-md flex items-center gap-1 ">
              <Volume2Icon /> <span>voice</span>
            </div>

            <Button variant="ghost">
              <MessageSquareText className="size-6" />
            </Button>
          </div>

          <div className="flex  justify-center flex-wrap gap-2"></div>

          <div className="relative">
            <div className="flex items-center justify-center gap-5 my-10">
              <ButtonGroup className="bg-zinc-600 rounded ">
                <Button
                  size="icon-lg"
                  variant="ghost"
                  className={`${
                    isShare && "bg-red-600/80 text-primary-foreground"
                  } cursor-pointer `}
                >
                  {isShare ? (
                    <ScreenShare className="w-8 h-8" />
                  ) : (
                    <ScreenShareOff className="w-8 h-8" />
                  )}
                </Button>
                <ButtonGroupSeparator className="bg-gray-500" />
                <Button
                  size="icon-lg"
                  variant="ghost"
                  className={`${
                    isCallOff && "bg-red-600/80 text-primary-foreground"
                  } cursor-pointer`}
                >
                  {isCallOff ? <Video /> : <VideoOff />}
                </Button>
              </ButtonGroup>

              <ButtonGroup className="bg-zinc-600 rounded ">
                <Button
                  size="icon-lg"
                  variant="ghost"
                  className={`${
                    isMicOff && "bg-red-600/80 text-primary-foreground"
                  } cursor-pointer`}
                >
                  {isMicOff ? <Mic /> : <MicOff />}
                </Button>
                <ButtonGroupSeparator className="bg-gray-500" />
                <Button
                  size="icon-lg"
                  variant="ghost"
                  className="bg-red-600/80  "
                >
                  <Phone />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      ) : (
        <VoiceRoom />
      )}
    </>
  );
}
