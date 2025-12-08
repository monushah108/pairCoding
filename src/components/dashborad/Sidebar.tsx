import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Binary } from "lucide-react";

const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export default function Sidebar() {
  return (
    <div className="flex items-center justify-between flex-col ">
      <div className="flex items-center gap-4 flex-col pt-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="@me">
              <Button>
                <Binary className="h-5 w-5" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Direct Message</p>
          </TooltipContent>
        </Tooltip>

        {GROUPS.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Link to="server">
                <Avatar className="rounded-lg cursor-pointer hover:scale-105 transition-transform size-9">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${item}`}
                    alt={`Avatar ${item}`}
                  />
                  <AvatarFallback>{item}</AvatarFallback>
                </Avatar>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
