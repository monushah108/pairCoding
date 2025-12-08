import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { memo } from "react";

const FriendsList = memo(function FriendsList({ setChat }) {
  return (
    <aside className="border-r border-border py-4 h-full">
      <h2 className="text-center text-sm border-b border-border py-2 font-medium">
        All Friends
      </h2>
      <div className="flex flex-col gap-1 pt-2">
        {[1, 2].map((_, id) => (
          <div
            key={id}
            onClick={() => setChat([{ id, name: "monu" }])}
            className="p-2 flex items-center gap-2 hover:bg-muted/50 rounded-md cursor-pointer transition"
          >
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=m`}
              />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <p className="text-sm">monu</p>
          </div>
        ))}
      </div>
    </aside>
  );
});

export default FriendsList;
