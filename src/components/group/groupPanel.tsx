import { useGetAllChannelQuery } from "@/store/services/channel/channelApi";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useParams } from "@tanstack/react-router";

export default function GroupPanel() {
  // const { data, isError, isLoading } = useGetAllChannelQuery(groupId);
  // const admins = data?.members.filter((user) => user.role == "ADMIN");
  // const onlineUsers = data?.members;

  return (
    <aside className="w-60 bg-background/60 backdrop-blur-md ">
      <ScrollArea.Root className="h-[800px]">
        <ScrollArea.Viewport className="h-full p-3 space-y-6">
          {/* Admin Section */}
          <div className="my-4">
            <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2 tracking-wide">
              Admin
            </h3>
            {/* <div className="space-y-1">
              {admins?.map((user) => (
                <div
                  key={user._id}
                  className="px-2 py-1.5 rounded-md text-sm font-medium text-primary/80 hover:bg-accent hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Avatar>
                    <AvatarImage src={user.picture} />
                    <AvatarFallback>E</AvatarFallback>
                  </Avatar>
                  {user.name}
                </div>
              ))}
            </div> */}
          </div>

          {/* Online Section */}
          <div className="my-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex-1 h-px bg-border/60" />
              <span className="text-[11px] text-muted-foreground uppercase tracking-wide">
                Online
              </span>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            {/* <div className="space-y-1">
              {onlineUsers?.map((user) => (
                <div
                  key={user._id}
                  className="px-2 py-1.5 rounded-md text-sm font-medium text-primary/80 hover:bg-accent hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Avatar>
                    <AvatarImage src={user.picture} />
                    <AvatarFallback>E</AvatarFallback>
                  </Avatar>
                  {user.name}
                </div>
              ))}
            </div> */}
          </div>
        </ScrollArea.Viewport>

        {/* Custom scrollbar styling */}
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="flex select-none touch-none p-[2px]"
        >
          <ScrollArea.Thumb className="flex-1 bg-border rounded-full" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </aside>
  );
}
