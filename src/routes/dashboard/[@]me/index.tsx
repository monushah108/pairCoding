import Dashboardheader from "@/components/dashborad/Dashboardheader";
import AddFriend from "@/components/dashborad/ui/addFriend";
import NoChat from "@/components/dashborad/ui/noChat";
import AllUsers from "@/components/dashborad/ui/allUsers";
import Pending from "@/components/dashborad/ui/pending";

import { createFileRoute } from "@tanstack/react-router";

import { useState } from "react";

export const Route = createFileRoute("/dashboard/@me/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [tab, setTab] = useState("noChat");

  return (
    <div className="flex flex-col justify-between h-full">
      <Dashboardheader setTab={setTab} />
      {tab == "noChat" && <NoChat />}
      {tab == "friends" && <AllUsers />}
      {tab == "addFriends" && <AddFriend />}
      {tab == "pending" && <Pending />}
    </div>
  );
}
