import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { auth } from "../lib/utils";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    if (auth.user) throw redirect({ to: "/" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
