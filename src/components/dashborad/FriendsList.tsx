import { EllipsisVertical, MessageCircle, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function FriendsList() {
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
              {Array(2)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className="group flex items-center justify-between   px-2 pt-2 mb-2 hover:bg-accent border-border pb-3 border-b "
                  >
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=m`}
                        />
                      </Avatar>
                      <span className="text-sm ml-2">monu</span>
                    </div>

                    <div className="flex items-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="group-hover:block hidden"
                          >
                            <MessageCircle />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Message</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
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
