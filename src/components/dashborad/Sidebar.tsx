import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Binary } from "lucide-react";
import ServerModle from "./module/serverModle";
import { GetAllserver } from "../../api/serverapi.js";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    Allserver();
  }, []);

  const Allserver = async () => {
    try {
      const res = await GetAllserver();
      setServers(res);
    } catch (err) {
      console.log(err);
    }
  };
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
        <ServerModle />

        {servers.map(({ _id, name, picture }) => (
          <Tooltip key={_id}>
            <TooltipTrigger asChild>
              <Link to={`/dashboard/server/${_id}`}>
                <Avatar className="rounded-lg cursor-pointer hover:scale-105 transition-transform size-9">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${picture}`}
                    alt={`Avatar ${name}`}
                  />
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
