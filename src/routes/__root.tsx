import { Outlet, createRootRoute } from "@tanstack/react-router";
import { auth } from "../lib/utils";

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async ({ location: { pathname } }) => {
    if (pathname !== "/print") {
      const res = await fetch(`${location.origin}/4DACTION/api_auth`);
      const { result } = await res.json();
      auth.setUser(result);
    }
  },
});

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
