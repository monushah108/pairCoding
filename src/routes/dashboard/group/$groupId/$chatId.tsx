import Chatmain from "@/components/chatRoom/chatMain";
import VoiceRoom from "@/components/chatRoom/VoiceRoom";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/group/$groupId/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  const chatType = "chat";
  return <>{chatType == "chat" ? <Chatmain /> : <VoiceRoom />}</>;
}
