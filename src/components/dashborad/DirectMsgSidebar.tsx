import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { memo } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const DirectMsgSidebar = memo(function DirectMsgSidebar({
  Chats,
  closeChat,
  handleChatUser,
}) {
  return (
    <aside className="border-r border-border py-4 h-full">
      <h2 className="text-center text-sm border-b border-border py-3 font-medium">
        All Friends
      </h2>
      <div
        className="flex flex-col gap-4 mt-8"
        onClick={(e) => e.stopPropagation()}
      >
        {Chats.map(({ picture, displayName, name, _id, roomId }) => (
          <div
            onClick={() => handleChatUser(_id)}
            key={_id}
            className="h-10 mx-2 flex items-center gap-2 hover:bg-muted/50 rounded-md cursor-pointer transition group  justify-between relative"
          >
            <div className="flex items-center flex-1 gap-2">
              <Avatar>
                <AvatarImage src={picture} />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <p className="text-sm text-black">{name}</p>
            </div>

            <Button
              onClick={() => closeChat(roomId)}
              variant="ghost"
              size="icon"
              className="group-hover:block hidden text-center cursor-pointer"
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
    </aside>
  );
});

export default DirectMsgSidebar;
