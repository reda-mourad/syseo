import { createFileRoute } from "@tanstack/react-router";
import type { DataResponse } from "../../4d";
import { App } from "../../app";

export const Route = createFileRoute("/_main/$id")({
  component: RouteComponent,
  loader: async ({ params: { id } }) => {
    const res = await fetch(`${location.origin}/4DACTION/form_get/${id}`);
    const data: DataResponse | undefined = await res.json();
    return data;
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return <App initData={data} />;
}
