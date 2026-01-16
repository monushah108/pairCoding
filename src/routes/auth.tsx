import { Tiles } from "@/components/ui/tiles";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="overflow-hidden relative min-h-svh">
      <div className="absolute inset-0 -z-10">
        <Tiles rows={50} cols={50} tileSize="md" />
      </div>

      <div className="flex min-h-svh flex-col items-center justify-center gap-6">
        <div className="w-full max-w-md p-2 md:p-5 bg-white shadow-md rounded z-50">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
