import { Button } from "@/components/ui/button";
import { FileDown, Paperclip, Send, Smile, SmilePlus } from "lucide-react";

import PlaygroundPermissionModule from "../dashborad/module/PlaygroundPermissionModule";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Separator } from "./separator";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

export default function ChatInput() {
  const [openEmoji, setEmoji] = useState(false);
  return (
    <div className=" flex items-center gap-2  p-4">
      <div className=" w-full flex items-center rounded  overflow-hidden">
        <InputGroup className="h-10">
          <InputGroupAddon>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <Button variant="ghost">
                  <Paperclip />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button variant="ghost" className="w-full">
                    {" "}
                    <FileDown /> upload File
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </InputGroupAddon>
          <InputGroupInput
            placeholder="send messages.."
            className="w-full p-2 outline-none text-sm placeholder:text-gray-500 placeholder:italic "
          />
          <InputGroupAddon align="inline-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <SmilePlus />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="p-0">
                <EmojiPicker
                  onEmojiClick={(emoji) => console.log(emoji)}
                  className="w-full"
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <Button variant="ghost">
        <Send />
      </Button>

      <PlaygroundPermissionModule />
    </div>
  );
}
