import { EllipsisVertical, MessageCircle, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function FriendsList({ handleMsg, Allfriends }) {
  const friend = Allfriends.map((f) => ({ ...f.userId, ChatId: f.ChatId }));

  return (
    <div className="flex-1 flex justify-center">
      <main className="p-4 flex-1">
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search" />
        </InputGroup>
        <div className="space-y-2 mt-4">
          <h2 className="text-sm font-semibold text-gray-400">All Friends -</h2>
          <ScrollArea.Root className=" p-3 " style={{ height: "350px" }}>
            <ScrollArea.Viewport className="w-full h-full">
              {friend.map(({ nickName, name, _id, picture, ChatId }) => (
                <div
                  key={_id}
                  className="group flex items-center justify-between   px-2 pt-2 mb-2 hover:bg-accent border-border pb-3 border-b "
                >
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage src={picture} />
                    </Avatar>
                    <div className="text-sm ml-2">
                      <span>{name}</span>
                      <span className="group-hover:inline-block hidden text-xs italic ml-1 text-primary/60">
                        {nickName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleMsg(ChatId, _id)}
                          variant="ghost"
                          size="sm"
                          className="group-hover:block hidden cursor-pointer"
                        >
                          <MessageCircle />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Message</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer"
                        >
                          <EllipsisVertical />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">More</TooltipContent>
                    </Tooltip>
                  </div>
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
        </div>
      </main>
    </div>
  );
}
