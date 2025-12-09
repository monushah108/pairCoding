import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { memo } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const DirectMsgSidebar = memo(function DirectMsgSidebar() {
  return (
    <aside className="border-r border-border py-4 h-full">
      <h2 className="text-center text-sm border-b border-border py-2 font-medium">
        All Friends
      </h2>
      <div className="flex flex-col gap-4 mt-8">
        {[1, 2].map((_, id) => (
          <div
            key={id}
            className="h-10 mx-2 flex items-center gap-2 hover:bg-muted/50 rounded-md cursor-pointer transition group  justify-between relative"
          >
            <div className="flex items-center flex-1 gap-2">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=m`}
                />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <p className="text-sm">monu</p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="group-hover:block hidden text-center"
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
