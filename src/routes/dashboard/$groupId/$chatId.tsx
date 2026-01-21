import GroupText from "@/components/group/groupText";
import GroupVoice from "@/components/group/groupVoice";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/$groupId/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { type } = Route.useSearch();

  return <>{type == "TEXT" ? <GroupText /> : <GroupVoice />}</>;
}
