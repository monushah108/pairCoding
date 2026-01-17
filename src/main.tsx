import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import { Store } from "../src/store/index";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import NotFound from "./components/layout/notFound";
import { Provider } from "@radix-ui/react-tooltip";
// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <NotFound />,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  );
}
