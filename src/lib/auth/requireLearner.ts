import { redirect } from "next/navigation";
import { getCurrentLearner } from "@/lib/auth/session";

// Da chiamare a inizio di ogni Server Component protetto.
export async function requireLearner() {
  const learner = await getCurrentLearner();
  if (!learner) redirect("/login");
  return learner;
}
