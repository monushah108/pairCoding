import GroupSidebar from "@/components/group/groupSidebar";

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/$groupId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { groupId } = Route.useParams();

  return (
    <section className="grid grid-cols-[200px_1fr] h-full">
      <div className="flex flex-col ">
        <GroupSidebar groupId={groupId} />
      </div>
      <Outlet />
    </section>
  );
}
