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
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

const INITIAL_ACTION_STATE = { ok: false as const, error: "" };

const TOTAL_STEPS = 5;

const STEP_1_OPTIONS = [
  { value: "LIVE", label: "I want to live there", description: "Primary residence", icon: "🏡" },
  { value: "INVEST", label: "I want to invest", description: "Rental income or appreciation", icon: "📈" },
];

const STEP_2_OPTIONS = [
  { value: "BUDGET_300K_500K", label: "$300K – $500K", icon: "💰" },
  { value: "BUDGET_500K_1M", label: "$500K – $1M", icon: "💎" },
  { value: "BUDGET_1M_PLUS", label: "$1M+", description: "Ultra-premium", icon: "🏆" },
];

const STEP_3_OPTIONS = [
  { value: "ZERO_TO_THREE_MONTHS", label: "0–3 months", description: "Ready to move", icon: "🚀" },
  { value: "THREE_TO_SIX_MONTHS", label: "3–6 months", description: "Planning ahead", icon: "📅" },
  { value: "EXPLORING", label: "Just exploring", description: "No set timeline", icon: "🔍" },
];

const STEP_4_OPTIONS = [
  { value: "APPROVED_FINANCING", label: "Approved financing", description: "Pre-approved by a lender", icon: "✅" },
  { value: "CASH", label: "Buying cash", description: "No financing needed", icon: "💵" },
  { value: "NEED_FINANCING", label: "Need financing", description: "Haven't applied yet", icon: "🏦" },
  { value: "NOT_SURE", label: "Not sure yet", icon: "🤔" },
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

export function QualificationFlow() {
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
    if (!contact.name || contact.name.length < 2) errors.name = "Name must be at least 2 characters";
    if (!contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errors.email = "Invalid email address";
    if (!contact.phone || contact.phone.length < 8) errors.phone = "Phone must be at least 8 characters";
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function canProceed(): boolean {
    switch (step) {
      case 1: return !!answers.intent;
      case 2: return !!answers.budget;
      case 3: return !!answers.timeline;
      case 4: return !!answers.financing;
      case 5: return !!(contact.name && contact.email && contact.phone);
      default: return false;
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
        toast.error(result.error || "Something went wrong. Please try again.");
      }
      // On success, server redirects to /thank-you
    });
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="mb-6">
            <QualificationProgress currentStep={step} totalSteps={TOTAL_STEPS} />
          </div>

          {step === 1 && (
            <QuestionStep
              question="Are you buying to live or to invest?"
              options={STEP_1_OPTIONS}
              selectedValue={answers.intent}
              onSelect={(v) => handleAnswer("intent", v)}
            />
          )}

          {step === 2 && (
            <QuestionStep
              question="What is your approximate budget?"
              options={STEP_2_OPTIONS}
              selectedValue={answers.budget}
              onSelect={(v) => handleAnswer("budget", v)}
            />
          )}

          {step === 3 && (
            <QuestionStep
              question="When are you planning to buy?"
              subtitle="Your timeline helps us prioritize your search"
              options={STEP_3_OPTIONS}
              selectedValue={answers.timeline}
              onSelect={(v) => handleAnswer("timeline", v)}
            />
          )}

          {step === 4 && (
            <QuestionStep
              question="Do you have financing or are you buying cash?"
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

        <CardFooter className="flex gap-3 pt-0">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isPending}
              className="flex-1"
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
              className="flex-1"
            >
              Continue
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isPending || !canProceed()}
              className="flex-1 bg-amber-500 text-white hover:bg-amber-400"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit & See Results"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
