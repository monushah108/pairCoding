import { useLocation } from "react-router-dom";

export default function ServerWindow() {
  const { state } = useLocation();

  console.log(state);

  return <div>ServerWindow</div>;
}
