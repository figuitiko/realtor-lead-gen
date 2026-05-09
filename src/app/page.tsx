import { redirect } from "next/navigation";
import { DEFAULT_REALTOR_SLUG } from "@/features/realtors/constants";

export default function LandingPage() {
  redirect(`/r/${DEFAULT_REALTOR_SLUG}`);
}
