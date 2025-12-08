import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";

import PlaygroundPermissionModule from "../dashborad/module/PlaygroundPermissionModule";

export default function ChatInput() {
  return (
    <div className=" flex items-center gap-2 p-4">
      <div className="border w-full flex items-center rounded  overflow-hidden">
        <Button variant="ghost">
          <Paperclip />
        </Button>
        <input
          placeholder="send messages.."
          type="text"
          className="w-full p-2 outline-none text-sm placeholder:text-gray-500 placeholder:italic "
        />
      </div>

      <Button variant="ghost">
        <Send />
      </Button>

      <PlaygroundPermissionModule />
    </div>
  );
}
