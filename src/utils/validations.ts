import { z } from "zod";

const phoneRegex = /^03[0-9]{9}$/;
const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;

export const installerFormSchema = z.object({
  installer: z
    .object({
      fullName: z
        .string()
        .min(2, "Full name must be at least 2 characters"),
      cnic: z
        .string()
        .regex(cnicRegex, "CNIC must be in format 00000-0000000-0"),
      cellNumber: z
        .string()
        .regex(phoneRegex, "Mobile number must start with 03 and have 11 digits"),
      whatsappNumber: z
        .string()
        .regex(phoneRegex, "WhatsApp number must start with 03 and have 11 digits"),
      address: z
        .string()
        .min(10, "Address must be at least 10 characters"),
      city: z.string().min(2, "City is required"),
      province: z.string().min(2, "Province is required"),
      companyName: z.string().optional(),
      paymentMethod: z.enum([
        "easypaisa",
        "jazzcash",
        "upaisa",
        "sadapay",
        "nayapay",
        "bankaccount",
      ]),
      accountNumber: z
        .string()
        .min(1, "Account number is required"),
      bankDetails: z
        .object({
          bankName: z.string().optional(),
          accountTitle: z.string().optional(),
          branchName: z.string().optional(),
        })
        .optional(),
    })
    .superRefine((installer, ctx) => {
      // If payment method is NOT a bank account, validate phone pattern
      if (
        installer.paymentMethod !== "bankaccount" &&
        !phoneRegex.test(installer.accountNumber)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Mobile wallet number must start with 03 and have 11 digits",
          path: ["accountNumber"],
        });
      }
    }),
});

export type InstallerFormData = z.infer<typeof installerFormSchema>;
