import { MessageSquareMore } from "lucide-react";

export default function NoChat() {
  return (
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
  );
}
