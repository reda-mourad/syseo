import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { auth } from "../lib/utils";

interface Patient {
  NoDossier: number;
  Nom: string;
  Prénom: string;
  forms: { xNumID: number; code: string }[];
}

export const Route = createFileRoute("/_main")({
  beforeLoad: () => {
    if (!auth.user) throw redirect({ to: "/sign-in" });
  },
  component: RouteComponent,
  loader: async () => {
    const res = await fetch(`${location.origin}/4DACTION/patient_list`);
    const { result } = (await res.json()) as { result: Patient[] };

    return { patients: result.filter((p) => p.forms.length) };
  },
});

function RouteComponent() {
  const { patients } = Route.useLoaderData();
  return (
    <div className="flex divide-x h-dvh">
      <aside className="space-y-4 p-4 w-60">
        {patients.map(({ NoDossier, Nom, Prénom, forms }) => (
          <div className="space-y-2" key={NoDossier}>
            <div>
              {Prénom} {Nom}
            </div>
            <div className="flex flex-col gap-2">
              {forms.map(({ code, xNumID }) => (
                <Link to="/$id" params={{ id: String(xNumID) }} key={xNumID}>
                  {code}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
