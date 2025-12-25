import { lazy, useState } from "react";
const TopBar = lazy(() => import("@/components/dashborad/TopBar"));
import FriendsList from "./FriendsList";
import { MessageSquareMore } from "lucide-react";
import { useOutletContext } from "react-router-dom";

export default function Nochat() {
  const { handleMsg, Allfriends, selectedTab, setTab } = useOutletContext();

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
