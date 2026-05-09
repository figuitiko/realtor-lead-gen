import { redirect } from "next/navigation";
import { DEFAULT_REALTOR_SLUG } from "@/features/realtors/constants";

export const metadata = {
  title: "See If You Qualify | Miami Premier Realty",
  description: "Answer a few quick questions to see if you qualify for our Miami real estate advisory service.",
};

export default function QualifyPage() {
  redirect(`/r/${DEFAULT_REALTOR_SLUG}/qualify`);
}
