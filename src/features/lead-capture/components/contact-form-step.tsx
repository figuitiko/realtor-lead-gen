"use client";

import { useRef } from "react";
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
      <div>
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          How can we reach you?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;ll contact you within 24 hours to schedule a consultation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Your full name"
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone / WhatsApp</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (305) 555-0100"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
}
