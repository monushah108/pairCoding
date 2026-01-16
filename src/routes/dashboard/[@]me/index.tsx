import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/@me/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/@me/"!</div>;
}
