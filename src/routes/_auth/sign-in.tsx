import { createFileRoute, useRouter } from "@tanstack/react-router";
import { auth } from "../../lib/utils";

export const Route = createFileRoute("/_auth/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center p-4 min-h-dvh">
      <button
        onClick={async () => {
          const formData = new FormData();
          formData.set("username", "admin");
          formData.set("password", "password");
          const res = await fetch(`${location.origin}/4DACTION/api_auth`, {
            method: "POST",
            body: formData,
          });
          const user = await res.json();
          if (user) {
            auth.setUser(user);
            router.invalidate();
          }
        }}
      >
        Sign In
      </button>
    </div>
  );
}
