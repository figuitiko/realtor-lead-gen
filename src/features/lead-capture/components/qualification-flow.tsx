"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { QuestionStep } from "./question-step";
import { ContactFormStep } from "./contact-form-step";
import { QualificationProgress } from "./qualification-progress";
import { createLeadAction } from "@/actions/lead.actions";
import type { QualificationAnswers } from "@/features/lead-capture/types/lead.types";
import { ArrowLeft, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

const INITIAL_ACTION_STATE = { ok: false as const, error: "" };
const TOTAL_STEPS = 5;

const STEP_1_OPTIONS = [
  { value: "LIVE", label: "I want to live there", description: "Primary residence or second home", icon: "🏡" },
  { value: "INVEST", label: "I want to invest", description: "Rental income or long-term appreciation", icon: "📈" },
];

const STEP_2_OPTIONS = [
  { value: "BUDGET_300K_500K", label: "$300K – $500K", description: "Entry point for qualified opportunities", icon: "💰" },
  { value: "BUDGET_500K_1M", label: "$500K – $1M", description: "Competitive range for many Miami neighborhoods", icon: "💎" },
  { value: "BUDGET_1M_PLUS", label: "$1M+", description: "Luxury and premium inventory", icon: "🏆" },
];

const STEP_3_OPTIONS = [
  { value: "ZERO_TO_THREE_MONTHS", label: "0–3 months", description: "Ready to move quickly", icon: "🚀" },
  { value: "THREE_TO_SIX_MONTHS", label: "3–6 months", description: "Planning and preparing now", icon: "📅" },
  { value: "EXPLORING", label: "Just exploring", description: "Still learning the market", icon: "🔍" },
];

const STEP_4_OPTIONS = [
  { value: "APPROVED_FINANCING", label: "Approved financing", description: "Pre-approved and ready to act", icon: "✅" },
  { value: "CASH", label: "Buying with cash", description: "No financing required", icon: "💵" },
  { value: "NEED_FINANCING", label: "Need financing", description: "I need lender guidance first", icon: "🏦" },
  { value: "NOT_SURE", label: "Not sure yet", description: "I still need clarity on financing", icon: "🤔" },
];

interface ContactData {
  name: string;
  email: string;
  phone: string;
}

interface ContactErrors {
  name?: string;
  email?: string;
  phone?: string;
}

interface QualificationFlowProps {
  realtorSlug: string;
}

export function QualificationFlow({ realtorSlug }: QualificationFlowProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QualificationAnswers>({});
  const [contact, setContact] = useState<ContactData>({ name: "", email: "", phone: "" });
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [isPending, startTransition] = useTransition();

  function handleAnswer(field: keyof QualificationAnswers, value: string) {
    setAnswers((prev) => ({ ...prev, [field]: value as never }));
  }

  function handleContactChange(field: keyof ContactData, value: string) {
    setContact((prev) => ({ ...prev, [field]: value }));
    setContactErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validateContact(): boolean {
    const errors: ContactErrors = {};
    if (!contact.name || contact.name.length < 2) errors.name = "Please enter your full name.";
    if (!contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errors.email = "Please use a valid email address.";
    if (!contact.phone || contact.phone.length < 8) errors.phone = "Please add the best phone or WhatsApp number for follow-up.";
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function canProceed(): boolean {
    switch (step) {
      case 1:
        return !!answers.intent;
      case 2:
        return !!answers.budget;
      case 3:
        return !!answers.timeline;
      case 4:
        return !!answers.financing;
      case 5:
        return !!(contact.name && contact.email && contact.phone);
      default:
        return false;
    }
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleSubmit() {
    if (!validateContact()) return;

    const formData = new FormData();
    formData.append("realtorSlug", realtorSlug);
    formData.append("name", contact.name);
    formData.append("email", contact.email);
    formData.append("phone", contact.phone);
    formData.append("intent", answers.intent!);
    formData.append("budget", answers.budget!);
    formData.append("timeline", answers.timeline!);
    formData.append("financing", answers.financing!);

    startTransition(async () => {
      const result = await createLeadAction(INITIAL_ACTION_STATE, formData);
      if (!result.ok) {
        toast.error(result.error || "We couldn’t submit your qualification. Please try again.");
      }
      // On success, server redirects to /thank-you
    });
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <Card className="overflow-hidden border-border/60 shadow-xl shadow-slate-950/5">
        <CardContent className="space-y-6 pt-6 sm:pt-8">
          <QualificationProgress currentStep={step} totalSteps={TOTAL_STEPS} />

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
            <div className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <p>
                Your answers help us decide how quickly to follow up and what kind of inventory or guidance to prepare for you.
              </p>
            </div>
          </div>

          {step === 1 && (
            <QuestionStep
              question="What brings you to Miami real estate?"
              subtitle="We tailor the next step differently for residents and investors."
              helperText="This tells us whether to focus the conversation on lifestyle fit, ROI, or both."
              options={STEP_1_OPTIONS}
              selectedValue={answers.intent}
              onSelect={(v) => handleAnswer("intent", v)}
            />
          )}

          {step === 2 && (
            <QuestionStep
              question="What budget range are you targeting?"
              subtitle="We only work with opportunities starting at $300K."
              helperText="Budget determines which neighborhoods, buildings, and strategies make sense from day one."
              options={STEP_2_OPTIONS}
              selectedValue={answers.budget}
              onSelect={(v) => handleAnswer("budget", v)}
            />
          )}

          {step === 3 && (
            <QuestionStep
              question="How soon are you planning to buy?"
              subtitle="Timing helps us prioritize the right type of follow-up."
              helperText="A buyer ready now needs a very different response from someone still researching the market."
              options={STEP_3_OPTIONS}
              selectedValue={answers.timeline}
              onSelect={(v) => handleAnswer("timeline", v)}
            />
          )}

          {step === 4 && (
            <QuestionStep
              question="What does your financing look like today?"
              subtitle="We want to know how close you are to making a real move."
              helperText="This is one of the strongest signals for whether we should move fast, educate, or wait."
              options={STEP_4_OPTIONS}
              selectedValue={answers.financing}
              onSelect={(v) => handleAnswer("financing", v)}
            />
          )}

          {step === 5 && (
            <ContactFormStep
              values={contact}
              errors={contactErrors}
              onChange={handleContactChange}
            />
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t bg-muted/20 pt-4 sm:flex-row">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isPending}
              className="w-full flex-1"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          )}

          {step < TOTAL_STEPS ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="w-full flex-1"
            >
              Continue
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isPending || !canProceed()}
              className="w-full flex-1 bg-amber-500 text-white hover:bg-amber-400"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending your answers...
                </>
              ) : (
                "Submit qualification"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
