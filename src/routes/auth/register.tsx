import { RegisterForm } from "@/components/form/registerForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
