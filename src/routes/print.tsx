import { createFileRoute } from "@tanstack/react-router";
import { App } from "../app";

export const Route = createFileRoute("/print")({
  component: RouteComponent,
  loader: async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") ?? "";
    const secret = params.get("secret") ?? "";

    return fetch(`${location.origin}/4DACTION/form_get/?id=${id}`, {
      headers: { secret },
    }).then((res) => res.json());
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return <App initData={data} />;
}
