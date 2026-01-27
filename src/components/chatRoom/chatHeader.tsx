import { CircleUserRound, SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { updatePanel } from "@/store/feature/roomSlice";
import { useState } from "react";

import { useParams } from "@tanstack/react-router";
import { useGetRoomQuery } from "@/store/services/chat/chatApi";

export default function ChatHeader() {
  const param = useParams({ strict: false });
  const [panel, setPanel] = useState(false);
  const dispatch = useDispatch();

  const handlShow = () => {
    setPanel((pre) => !pre);
    dispatch(updatePanel(panel));
  };

  const { details } = useGetRoomQuery(param?.private, {
    selectFromResult: ({ data }) => ({
      details: data?.chatDetails[0],
    }),
  });

  return (
    <div className=" border-b border-border [&>button]:text-xs p-3 flex items-center justify-between">
      <div className="flex items-center flex-1 gap-2">
        <div className="relative rounded-full">
          <Avatar>
            <AvatarImage src={details?.picture} />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          {/* {isOnline && (
            <div className="w-1.5 h-1.5 rounded-full  bg-green-500 absolute bottom-1 right-0"></div>
          )} */}
        </div>
        <p className="text-sm text-black">{details?.name}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="cursor-pointer" onClick={handlShow}>
          <CircleUserRound className="text-gray-600 w-5 h-5" />
        </Button>
        <InputGroup>
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-3" />
          </InputGroupAddon>

          <InputGroupInput
            placeholder={`search ${details?.nickName}`}
            className="placeholder:text-xs placeholder:font-medium "
          />
        </InputGroup>
      </div>
    </div>
  );
}
