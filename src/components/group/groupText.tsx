import GroupHeader from "./groupHeader";
import GroupPanel from "./groupPanel";
import Chatmain from "../chatRoom/chatMain";
import Resizable from "./ui/resizable";

export default function GroupText() {
  return (
    <div className="flex flex-col justify-between h-full">
      <GroupHeader />
      <Resizable sidbar={<GroupPanel />}>
        <Chatmain />
      </Resizable>
    </div>
  );
}
