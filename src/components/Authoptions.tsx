import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import googleIcon from "../assets/google.svg";
import GithubIcon from "../assets/github.svg";
import { Link } from "react-router-dom";

export default function Authoptions() {
  return (
    <div className="grid grid-rows-3 col-end-2 gap-2">
      <Link to="/Auth/register">
        <Button variant="outline" type="button" className="py-6 rounded w-full">
          <Mail />
          countinue with email
        </Button>
      </Link>
      <Link to="/Auth/google">
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
