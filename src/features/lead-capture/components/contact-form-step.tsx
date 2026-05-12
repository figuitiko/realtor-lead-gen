"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

interface ContactFormStepProps {
  values: ContactFormData;
  errors: Partial<ContactFormData>;
  onChange: (field: keyof ContactFormData, value: string) => void;
}

export function ContactFormStep({ values, errors, onChange }: ContactFormStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">How should we follow up?</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Share your best contact details and we&apos;ll use them to confirm the right next step.
        </p>
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs leading-5 text-emerald-900 sm:text-sm">
          For qualified buyers, we usually respond within one business day with a call, WhatsApp message, or next-step recommendation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            placeholder="Jane Martinez"
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            className={errors.name ? "border-destructive" : ""}
            autoComplete="name"
          />
          {errors.name ? (
            <p className="text-xs text-destructive">{errors.name}</p>
          ) : (
            <p className="text-xs text-muted-foreground">Use the name you want us to use when we reach out.</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@example.com"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
            autoComplete="email"
          />
          {errors.email ? (
            <p className="text-xs text-destructive">{errors.email}</p>
          ) : (
            <p className="text-xs text-muted-foreground">We&apos;ll send any next-step details here.</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone or WhatsApp</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (305) 555-0100"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={errors.phone ? "border-destructive" : ""}
            autoComplete="tel"
          />
          {errors.phone ? (
            <p className="text-xs text-destructive">{errors.phone}</p>
          ) : (
            <p className="text-xs text-muted-foreground">WhatsApp works great if you&apos;re traveling or outside the U.S.</p>
          )}
        </div>
      </div>
    </div>
  );
}
