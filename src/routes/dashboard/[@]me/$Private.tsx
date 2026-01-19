import ChatWindow from "@/components/chatRoom/chatMain";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/@me/$Private")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ChatWindow />
    </div>
  );
}
