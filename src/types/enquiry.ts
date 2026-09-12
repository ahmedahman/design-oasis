/** Both the contact form and the land submission arrive through one endpoint. */
export type EnquiryKind = "CONTACT" | "LAND";

export type Enquiry = {
  kind: EnquiryKind;
  name: string;
  email: string;
  phone?: string;
  message: string;
  /** LAND only. */
  location?: string;
  landSize?: string;
};
