import { z } from "zod";

/**
 * One schema, two shapes. The land fields are required only when the enquiry
 * is a land submission, which keeps a single endpoint and a single validator
 * behind both forms.
 */
const base = {
  name: z.string().min(2, "Enter your name"),
  email: z.email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9\s()-]{7,20}$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  message: z.string().min(10, "Tell us a little more — at least a sentence"),
};

export const contactSchema = z.object({ kind: z.literal("CONTACT"), ...base });

export const landSchema = z.object({
  kind: z.literal("LAND"),
  ...base,
  location: z.string().min(2, "Where is the land?"),
  landSize: z.string().min(1, "Roughly how large is it?"),
});

export const enquirySchema = z.discriminatedUnion("kind", [contactSchema, landSchema]);

export type ContactValues = z.infer<typeof contactSchema>;
export type LandValues = z.infer<typeof landSchema>;
export type EnquiryValues = z.infer<typeof enquirySchema>;
