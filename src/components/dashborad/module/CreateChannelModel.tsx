import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { motion } from "motion/react";
import { Avatar, AvatarImage } from "../../ui/avatar";

export default function CreateChannelModel({ setAddChannel }) {
  const [channelType, setChannelType] = useState("text");
  const [Newchannel, setNewchannel] = useState("");
  const [nextStep, setnextStep] = useState(1);

  const privateChannel = {
    id: crypto.randomUUID(),
    channel_Name: "private channel",
    channel_Type: "private",
    channels: ["private-Room"],
  };

  const AddnewChannel = () => {
    if (Newchannel == "private") {
      setAddChannel((pre) => [...pre, privateChannel]);
      return;
    }

    setAddChannel((pre) => [
      ...pre,
      {
        id: crypto.randomUUID(),
        channel_Name: `${Newchannel} channel`,
        channel_Type: channelType,
        channels: [],
      },
    ]);

    setNewchannel("");
  };

  const incrementStep = () => setnextStep((pre) => (pre < 2 ? pre + 1 : 1));

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="hover:bg-accent/70 text-primary/70 hover:text-primary transition-colors"
          >
            Add channel
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-md border border-border/60 rounded-xl shadow-xl">
          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-primary">
              Create Channel
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              in <span className="text-primary font-medium">Text Channels</span>
            </DialogDescription>
          </DialogHeader>

          {/* Body */}
          {nextStep == 1 && (
            <div className="space-y-5 mt-3">
              {/* Channel Type */}
              <div className="bg-muted/30 rounded-md p-3 border border-border/50 space-y-2">
                <h3 className="font-semibold text-sm text-primary/90 ">
                  Channel Type
                </h3>
                {/* voice Channel */}
                <label
                  className={`flex items-start gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                    channelType === "voice"
                      ? "bg-accent/70 text-primary"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="channelType"
                    value="text"
                    checked={channelType === "voice"}
                    onChange={() => setChannelType("voice")}
                    className="mt-1 accent-primary"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">#</span>
                    <div>
                      <p className="font-medium text-sm">voice</p>
                      <p className="text-xs text-muted-foreground">
                        Send messages, screen sharing , voice chat, and more.
                      </p>
                    </div>
                  </div>
                </label>
                {/* Text Channel */}
                <label
                  className={`flex items-start gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                    channelType === "text"
                      ? "bg-accent/70 text-primary"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="channelType"
                    value="text"
                    checked={channelType === "text"}
                    onChange={() => setChannelType("text")}
                    className="mt-1 accent-primary"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">#</span>
                    <div>
                      <p className="font-medium text-sm">Text</p>
                      <p className="text-xs text-muted-foreground">
                        Send messages, images, emojis, and more.
                      </p>
                    </div>
                  </div>
                </label>
                {/* Private Channel */}
                <label
                  className={`flex items-start gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                    channelType === "private"
                      ? "bg-accent/70 text-primary"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="channelType"
                    value="private"
                    checked={channelType === "private"}
                    onChange={() => setChannelType("private")}
                    className="mt-1 accent-primary"
                  />
                  <div className="flex items-center gap-2">
                    <LockKeyhole className="w-4 h-4" />
                    <div>
                      <p className="font-medium text-sm">Private Channel</p>
                      <p className="text-xs text-muted-foreground">
                        Only selected members and roles can access.
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Channel Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Channel Name
                </label>
                <div className="flex items-center border border-border rounded-md px-2 py-2 bg-muted/20 focus-within:ring-1 focus-within:ring-primary/50 transition">
                  <span className="font-bold text-lg text-primary/70 mr-1">
                    #
                  </span>
                  <input
                    value={Newchannel}
                    onChange={(e) => setNewchannel(e.target.value)}
                    type="text"
                    placeholder="new-channel"
                    className="w-full bg-transparent outline-none text-sm text-primary placeholder:text-muted-foreground/70"
                  />
                </div>
              </div>
            </div>
          )}

          {nextStep == 2 && (
            <motion.div exit={{ x: 100, opacity: 0 }}>
              <ScrollArea.Root
                className="rounded-md bg-[#cccc] p-3 "
                style={{ height: "350px" }}
              >
                <ScrollArea.Viewport className="w-full h-full">
                  {Array(25)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-sm border px-1 py-1 mb-2"
                      >
                        <div className="flex items-center">
                          <Avatar>
                            <AvatarImage src="" />
                          </Avatar>
                          <span className="text-sm">monu</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <span className="text-xs">invite</span>
                        </Button>
                      </div>
                    ))}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  orientation="vertical"
                  className="flex select-none touch-none p-0.5 bg-transparent"
                >
                  <ScrollArea.Thumb className="flex-1 bg-[#555] rounded" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
              </ScrollArea.Root>
            </motion.div>
          )}

          {/* Footer */}
          <DialogFooter className="mt-4 flex justify-end gap-2">
            {nextStep == 1 ? (
              <Button
                className="text-sm font-medium"
                onClick={
                  channelType !== "private" ? AddnewChannel : incrementStep
                }
              >
                {channelType == "private" ? "next" : "Create Channel"}
              </Button>
            ) : (
              <Button className="text-sm font-medium" onClick={AddnewChannel}>
                Create Channel
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
