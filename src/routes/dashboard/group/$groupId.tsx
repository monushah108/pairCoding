import GroupSidebar from "@/components/group/groupSidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/group/$groupId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="grid grid-cols-[200px_1fr] h-full">
      <div className="flex flex-col row-span-3">
        <GroupSidebar />
        <Outlet />
      </div>
    </section>
  );
}
