import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/@me")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <main className="grid grid-cols-[220px_1fr] h-full">
        <Outlet />
      </main>
    </>
  );
}
