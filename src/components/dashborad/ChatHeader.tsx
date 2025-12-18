import { CircleUserRound, SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";

export default function ChatHeader({ openChat, handlePofile }) {
  const status = "online";
  const { picture, name, displayName } = openChat[0];
  return (
    <div className=" border-b border-border [&>button]:text-xs p-2.5 flex items-center justify-between">
      <div className="flex items-center flex-1 gap-1">
        <Avatar className="size-10">
          <AvatarImage src={picture} />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <div className="text-center ml-2">
          <p className="text-sm font-medium ">{name}</p>
          <p
            className={`text-[10px] ${
              status == "online" ? "text-green-400" : "text-gray-500"
            }  italic font-mono font-semibold`}
          >
            {status}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={handlePofile}
        >
          <CircleUserRound className="text-gray-600 w-5 h-5" />
        </Button>
        <InputGroup>
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-3" />
          </InputGroupAddon>

          <InputGroupInput
            placeholder={`search ${displayName}`}
            className="placeholder:text-xs placeholder:font-medium "
          />
        </InputGroup>
      </div>
    </div>
  );
}
