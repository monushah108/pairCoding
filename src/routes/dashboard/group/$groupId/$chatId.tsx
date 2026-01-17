import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/group/$groupId/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/group/$chatId"!</div>;
}
