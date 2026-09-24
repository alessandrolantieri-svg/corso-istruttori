import { redirect } from "next/navigation";
import { getCurrentLearner } from "@/lib/auth/session";

export default async function RootPage() {
  const learner = await getCurrentLearner();
  redirect(learner ? "/dashboard" : "/login");
}
