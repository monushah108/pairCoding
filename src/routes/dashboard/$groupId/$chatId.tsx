import GroupText from "@/components/group/groupText";
import GroupVoice from "@/components/group/groupVoice";
import { useGetAllChannelQuery } from "@/store/services/channel/channelApi";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/$groupId/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  const route = Route.useParams();

  const { data } = useGetAllChannelQuery(route?.groupId);

  const roomType = data?.Chatrooms.find((c) => route.chatId == c._id);

  return <>{roomType?.category == "TEXT" ? <GroupText /> : <GroupVoice />}</>;
}
