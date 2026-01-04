import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "@radix-ui/react-tooltip";
// import { Store } from "../src/store/index.js";

createRoot(document.getElementById("root")!).render(
  //   <Provider store={Store}>
  <App />
  //   </Provider>
);
