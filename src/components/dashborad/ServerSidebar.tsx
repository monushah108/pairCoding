import { ChevronRight, Plus, Trash2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { useState } from "react";
import CreateChannelModel from "./module/CreateChannelModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ServerSidebar() {
  const [selectedChannel, setSelectedChannel] = useState("");
  const [channelName, setChannelName] = useState("");
  const [collapseId, setCollapseId] = useState(null);
  const [inputId, setInputId] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [channels, setChannels] = useState([
    {
      id: crypto.randomUUID(),
      channel_Name: "Text channel",
      channel_Type: "text",
      channels: ["off-topic", "rules", "pair-programming"],
    },
    {
      id: crypto.randomUUID(),
      channel_Name: "voice channel",
      channel_Type: "voice",
      channels: ["Meeting-Room"],
    },
  ]);

  const CreateNewChannel = () => {
    if (!channelName) return;
  };

  return (
    <aside className="border-r border-border row-span-3 flex flex-col">
      <div className="flex-1">
        <div className="border-b border-border text-center font-semibold text-primary py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer">Rooms</div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>
                <CreateChannelModel setAddChannel={setChannels} />
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Button variant="destructive" className="w-full">
                  Delete channel <Trash2 className="w-3 h-3 text-white" />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {channels.map(({ id, channel_Name, channels }) => (
          <Collapsible
            key={id}
            open={collapseId == id}
            onOpenChange={() => {
              setCollapseId(collapseId == id ? null : id);
              setInputId(collapseId != id && null);
              setSelectedChannelId(id);
            }}
          >
            <div className="flex items-center py-1 px-2">
              <CollapsibleTrigger
                onClick={() => {
                  setCollapseId(id);
                  setInputId(null);
                  setSelectedChannelId(id);
                }}
                className="flex items-center justify-between
           px-3 py-2 w-full text-primary/60  group"
              >
                <p className="flex items-center">
                  <span className="text-xs font-semibold ">{channel_Name}</span>
                  <ChevronRight className="w-3 h-3 group-data-[state=open]:rotate-90" />
                </p>
              </CollapsibleTrigger>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      setCollapseId(id);
                      setInputId(id);
                    }}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent/70 text-primary/70 hover:text-primary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Create channel</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <CollapsibleContent
              className="flex flex-col gap-1
  [&>button]:hover:bg-accent 
  [&>button]:w-full 
  [&>button]:text-left 
  text-primary/60 
  [&>button:before]:content-['#'] 
    [&>button:before]:font-bold
             [&>button:before]:text-base 
              [&>button:before]:px-0.5
  font-semibold 
  text-sm 
  px-3 peer"
            >
              {inputId == id && (
                <Input
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  onKeyDown={(e) => e.key == "Enter" && CreateNewChannel}
                />
              )}
              {!channels.length ? (
                <p className="text-xs text-center italic hover:bg-accent hover:text-primary transition-colors p-2">
                  -- No channels yet ?? --
                </p>
              ) : (
                channels.map((text, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedChannel(text)}
                    className={`${
                      selectedChannel === text
                        ? "bg-accent text-primary"
                        : "hover:bg-accent hover:text-primary"
                    } py-1.5 rounded px-2 transition-colors`}
                  >
                    {text}
                  </button>
                ))
              )}
            </CollapsibleContent>
            {selectedChannel && selectedChannelId == id && (
              <button
                className="peer-data-[state=open]:hidden peer-data-[state=closed]:flex
              peer-data-[state=closed]:bg-accent w-full 
                 items-center gap-1 text-sm font-semibold px-3 py-1.5 
                 text-primary/60 hover:text-primary transition-colors"
              >
                <span className="font-bold text-base">#</span>
                {selectedChannel}
              </button>
            )}
          </Collapsible>
        ))}
      </div>
    </aside>
  );
}
