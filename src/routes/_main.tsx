import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { auth } from "../lib/utils";
import { Button } from "@/components/ui/button";

// interface Patient {
//   NoDossier: number;
//   Nom: string;
//   Prénom: string;
//   forms: { xNumID: number; code: string }[];
// }

interface Form {
  UUID: string;
  code: string;
  data: Record<string, string>;
}

interface Exam {
  UUID: string;
  UUID_Patient: string;
  date: string;
  type: string;
  forms: Form[];
}

interface Patient {
  UUID: string;
  first_name: string;
  last_name: string;
  exams: Exam[];
}

export const Route = createFileRoute("/_main")({
  beforeLoad: () => {
    if (!auth.user) throw redirect({ to: "/sign-in" });
  },
  component: RouteComponent,
  loader: async () => {
    const res = await fetch(`${location.origin}/4DACTION/patient_list`);
    const { result } = (await res.json()) as { result: Patient[] };

    return { patients: result };
  },
});

function RouteComponent() {
  const { patients } = Route.useLoaderData();
  return (
    <div className="flex divide-x h-dvh">
      <aside className="space-y-4 p-4 w-60">
        {patients.map(({ UUID, first_name, last_name, exams }) => (
          <div className="space-y-2" key={UUID}>
            <div>{[first_name, last_name].join(" ")}</div>
            <div className="flex flex-col gap-2">
              {exams.map(({ UUID, date, forms }) => (
                <div key={UUID}>
                  <span>Examen : {date}</span>
                  <div className="flex flex-col gap-2">
                    {forms.map(({ UUID, code }) => (
                      <Button key={UUID} asChild variant="ghost">
                        <Link to="/$id" params={{ id: UUID }}>
                          {code}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
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
