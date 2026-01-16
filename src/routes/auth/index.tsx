import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import googleIcon from "../../assets/google.svg";
import GithubIcon from "../../assets/github.svg";
export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-rows-3 col-end-2 gap-2">
      <Link to="/auth/register">
        <Button variant="outline" type="button" className="py-6 rounded w-full">
          <Mail />
          countinue with email
        </Button>
      </Link>
      <Link to="/auth/google">
        <Button variant="outline" type="button" className="py-6 rounded w-full">
          <img src={googleIcon} className="size-5" />
          countinue with google
        </Button>
      </Link>
      <Link to="/Auth/Github">
        <Button variant="outline" type="button" className="py-6 rounded w-full">
          <img src={GithubIcon} className="size-5" />
          countinue with Github
        </Button>
      </Link>
    </div>
  );
}
