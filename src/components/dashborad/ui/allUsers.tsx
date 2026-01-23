import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAllFriendsQuery } from "@/store/services/auth/userApi";
import { useSendMsgMutation } from "@/store/services/chat/messageApi";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { EllipsisVertical, MessageCircle, Search } from "lucide-react";
export default function AllUsers() {
  const { data } = useAllFriendsQuery();
  const [sendMsg] = useSendMsgMutation();

  const handleMsg = () => {};

  return (
    <div className="flex-1 flex justify-center ">
      <main className=" flex-1 py-3 px-10">
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
              {data?.AllFriends.Friend.map(({ name, picture, _id }) => (
                <div
                  key={_id}
                  className="group flex items-center justify-between rounded-md  px-3 py-5 mb-2 hover:bg-accent  "
                >
                  <div className="flex items-center">
                    <Avatar className="size-10">
                      <AvatarImage src={picture} />
                    </Avatar>
                    <div className="text-sm ml-2">
                      <span>{name}</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
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
