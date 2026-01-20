import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import NotFound from "@/components/layout/notFound";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
