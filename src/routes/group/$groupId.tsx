import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/group/$groupId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="grid grid-cols-[200px_1fr] h-full">
      <div className="flex flex-col row-span-3">
        <Outlet />
      </div>
    </section>
  );
}
