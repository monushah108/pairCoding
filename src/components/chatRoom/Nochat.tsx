import { lazy, useState } from "react";
const TopBar = lazy(() => import("@/components/dashborad/Dashboardheader"));
import FriendsList from "../dashborad/friendList";
import { MessageSquareMore } from "lucide-react";

export default function Nochat() {
  return (
    <div className="flex flex-col justify-between h-full">
      <TopBar
        selectedTab={selectedTab}
        setTab={setTab}
        Allfriends={Allfriends}
      />

      {selectedTab == "chat" && (
        <div className="relative flex-1 flex items-center justify-center">
          <div className="flex items-center justify-center flex-col gap-2">
            <div className="rounded bg-primary/50 animate-bounce p-2 text-white">
              <MessageSquareMore />
            </div>

            <p className="text-sm text-primary/50 font-semibold">
              No Conversation yet!!
            </p>
          </div>
        </div>
      )}

      {selectedTab == "friends" && (
        <FriendsList handleMsg={handleMsg} Allfriends={Allfriends} />
      )}
    </div>
  );
}
