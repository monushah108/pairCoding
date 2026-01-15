import { ChevronRight, Hash, Plus, Trash2, Volume2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { useEffect, useState } from "react";
import channelModle from "./module/channelModle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { GetAllchannels } from "../../api/Serverapi.js";
import { Link, useParams } from "react-router-dom";
import { Input } from "../ui/input.js";

export default function ServerSidebar({ openChannel, setOpenChannel }) {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [collapseId, setCollapseId] = useState(null);
  const [inputId, setInputId] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [channels, setChannels] = useState([]);
  const [Rooms, setRooms] = useState([]);

  const { serverId } = useParams();

  const CreateNewChannel = () => {
    if (!channelName) return;
  };

  useEffect(() => {
    getAllChannel();
  }, []);

  const getAllChannel = async () => {
    try {
      const res = await GetAllchannels({ serverId });
      console.log(res);
      setChannels(res?.channel);
      setRooms(res?.Chatrooms);
    } catch (err) {
      console.log(err);
    }
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
                <channelModle setAddChannel={setChannels} />
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Button variant="destructive" className="w-full">
                  Delete channel <Trash2 className="w-3 h-3 text-white" />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {channels.map(({ _id: cId, name, serverId, category }) => (
          <Collapsible
            key={cId}
            // open={collapseId == _id}
            onOpenChange={() => {
              setCollapseId(collapseId == cId ? null : cId);
              setInputId(collapseId != cId && null);
              setSelectedChannelId(cId);
            }}
          >
            <div className="flex items-center py-1 px-2">
              <CollapsibleTrigger
                onClick={() => {
                  setCollapseId(cId);
                  setInputId(null);
                  setSelectedChannelId(cId);
                }}
                className="flex items-center justify-between
           px-3 py-2 w-full text-primary/60  group"
              >
                <p className="flex items-center">
                  <span className="text-md font-semibold ">{name}</span>
                  <ChevronRight className="w-3 h-3 group-data-[state=open]:rotate-90" />
                </p>
              </CollapsibleTrigger>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      setCollapseId(cId);
                      setInputId(cId);
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

            <CollapsibleContent className="flex flex-col gap-1 font-semibold text-sm px-3 peer">
              {inputId == cId && (
                <Input
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  onKeyDown={(e) => e.key == "Enter" && CreateNewChannel}
                />
              )}
              {Rooms.map(
                ({ _id, category, name, channelId }) =>
                  channelId == cId && (
                    <button
                      key={_id}
                      onClick={() => setSelectedChannel(name)}
                      className={`${
                        selectedChannel === name
                          ? "bg-accent text-primary"
                          : "hover:bg-accent hover:text-primary"
                      } py-1.5 rounded px-2 transition-colors cursor-pointer`}
                    >
                      <Link to={_id}>
                        <span
                          className="hover:bg-accent w-full text-left flex items-center gap-2
  text-primary/60
  text-sm
    font-bold

              px-0.5"
                        >
                          {category === "VOICE" ? (
                            <Volume2 className="w-4 h-4" />
                          ) : (
                            <Hash className="w-4 h-4" />
                          )}
                          {name}
                        </span>
                      </Link>
                    </button>
                  )
              )}
            </CollapsibleContent>
            {selectedChannel && selectedChannelId == _id && (
              <button
                className="peer-data-[state=open]:hidden peer-data-[state=closed]:flex
              peer-data-[state=closed]:bg-accent w-full
                 items-center gap-1 text-sm font-semibold px-3 py-1.5
                 text-primary/60 hover:text-primary transition-colors cursor-pointer"
              >
                <span className="font-bold text-base">
                  {category === "VOICE" ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <Hash className="w-4 h-4" />
                  )}
                </span>
                {selectedChannel}
              </button>
            )}
          </Collapsible>
        ))}
      </div>
    </aside>
  );
}

/*
 
 

 */

/* 
 {!Rooms.length ? (
                <p className="text-sm text-center italic hover:bg-accent hover:text-primary transition-colors p-2">
                  -- No channels yet ?? --
                </p>
              ) : (
                Rooms.map(({ roomId: _id, type, name, channelId, category }) =>
                  channelId == _id ? (
                   
                  ) : null
                )
              )}

*/
