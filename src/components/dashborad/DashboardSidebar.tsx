import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { memo } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useAllFriendsQuery } from "@/store/services/auth/userApi";

const DashboardhSidbar = memo(function DirectMsgSidebar() {
  const { data, isError, isLoading } = useAllFriendsQuery();

  return (
    <aside className="border-r border-border h-full">
      <h2 className="text-center text-sm border-b border-border py-5 font-medium">
        All Friends
      </h2>
      <div
        className="flex flex-col gap-4 mt-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* {friends.map(({ picture, nickName, name, _id, ChatId, isOnline }) => (
          <div
            onClick={() => handleChatUser(ChatId)}
            key={_id}
            className="h-10 mx-2 flex items-center gap-2 hover:bg-muted/50 rounded-md cursor-pointer transition group  justify-between relative"
          >
            <div className="flex items-center flex-1 gap-2">
              <div className="relative rounded-full">
                <Avatar>
                  <AvatarImage src={picture} />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                {isOnline && (
                  <div className="w-2 h-2 rounded-full  bg-green-500 absolute bottom-1 right-0"></div>
                )}
              </div>
              <p className="text-sm text-black">{name}</p>
            </div>

            <Button
              onClick={() => closeChat(ChatId)}
              variant="ghost"
              size="icon"
              className="group-hover:block hidden text-center cursor-pointer"
            >
              <X />
            </Button>
          </div>
        ))} */}
      </div>
    </aside>
  );
});

export default DashboardhSidbar;
