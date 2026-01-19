import Dashboardheader from "@/components/dashborad/Dashboardheader";
import { createFileRoute } from "@tanstack/react-router";
import { MessageSquareMore } from "lucide-react";

export const Route = createFileRoute("/dashboard/@me/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col justify-between h-full">
      <Dashboardheader />
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
    </div>
  );
}
