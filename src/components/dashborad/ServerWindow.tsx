import { useLocation } from "@tanstack/react-router";

export default function ServerWindow({ header }) {
  const { state } = useLocation();

  console.log(state);

  return <div>ServerWindow</div>;
}
