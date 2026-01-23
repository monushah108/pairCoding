import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button.js";
import { Binary } from "lucide-react";
import ServerModle from "../module/serverModle.js";
import { useGetAllGroupsQuery } from "@/store/services/group/groupApi.js";

export default function Sidebar() {
  const { data } = useGetAllGroupsQuery();

  return (
    <div className="flex items-center justify-between flex-col ">
      <div className="flex items-center gap-4 flex-col pt-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/dashboard/@me">
              <Button>
                <Binary className="h-5 w-5" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Direct Message</p>
          </TooltipContent>
        </Tooltip>
        <ServerModle />

        {data?.map(({ _id, name, picture }) => (
          <Tooltip key={_id}>
            <TooltipTrigger asChild>
              <Link to={`/dashboard/$groupId`} params={{ groupId: _id }}>
                <Avatar className="rounded-lg cursor-pointer hover:scale-105 transition-transform size-9">
                  <AvatarImage src={picture} alt={`Avatar ${name}`} />
                  <AvatarFallback>{name}</AvatarFallback>
                </Avatar>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
