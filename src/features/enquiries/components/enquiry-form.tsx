"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { API_ROUTES } from "@/lib/constants/routes";

import { contactSchema, landSchema, type ContactValues, type LandValues } from "../lib/schema";

type Props = { kind: "CONTACT" } | { kind: "LAND" };

/**
 * One form component for both enquiry kinds. The land variant adds two fields
 * and a different schema; everything else — submit, error handling, the
 * endpoint — is shared, so there is only ever one of each to maintain.
 */
export function EnquiryForm({ kind }: Props) {
  const land = kind === "LAND";

  const form = useForm<ContactValues | LandValues>({
    resolver: standardSchemaResolver(land ? landSchema : contactSchema),
    defaultValues: land
      ? { kind: "LAND", name: "", email: "", phone: "", message: "", location: "", landSize: "" }
      : { kind: "CONTACT", name: "", email: "", phone: "", message: "" },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: ContactValues | LandValues) {
    try {
      const response = await fetch(API_ROUTES.enquiries, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Request failed");

      reset();
      toast.success("Thank you — we'll come back to you shortly.");
    } catch {
      toast.error("That did not send. Try again, or email us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      <input type="hidden" {...register("kind")} />

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label="Name"
          required
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormField
          label="Email"
          required
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <FormField
        label="Phone"
        type="tel"
        autoComplete="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />

      {land && (
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            label="Where is the land?"
            required
            placeholder="District, city"
            error={(errors as { location?: { message?: string } }).location?.message}
            {...register("location" as keyof LandValues)}
          />
          <FormField
            label="Roughly how large?"
            required
            placeholder="e.g. 2,500 sqm, or 4 hectares"
            error={(errors as { landSize?: { message?: string } }).landSize?.message}
            {...register("landSize" as keyof LandValues)}
          />
        </div>
      )}

      <FormField
        label={land ? "Tell us about the site" : "Message"}
        required
        as="textarea"
        error={errors.message?.message}
        {...register("message")}
      />

      <Button
        type="submit"
        size="lg"
        variant="accent"
        disabled={isSubmitting}
        className="self-start"
      >
        {isSubmitting ? "Sending…" : land ? "Submit your land" : "Send enquiry"}
      </Button>
    </form>
  );
}
