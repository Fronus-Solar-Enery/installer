import { InstallerFormData } from "@/types/form-types";

export const paymentMethods = [
  { value: "easypaisa", label: "EasyPaisa", labelUrdu: "ایزی پیسہ" },
  { value: "jazzcash", label: "JazzCash", labelUrdu: "جاز کیش" },
  { value: "upaisa", label: "UPaisa", labelUrdu: "یُو پیسہ" },
  { value: "sadapay", label: "SadaPay", labelUrdu: "سادہ پے" },
  { value: "nayapay", label: "NayaPay", labelUrdu: "نیا پے" },
  { value: "bankaccount", label: "Bank Account", labelUrdu: "بینک اکاؤنٹ" },
] as const;

export type PaymentMethod = (typeof paymentMethods)[number]["value"];

export const defaultFormValues: InstallerFormData = {
  installer: {
    fullName: "",
    cnic: "",
    cellNumber: "03",
    whatsappNumber: "03",
    address: "",
    city: "",
    province: "",
    companyName: "",
    paymentMethod: "easypaisa" as const,
    accountNumber: "",
    bankDetails: {
      bankName: "",
      accountTitle: "",
      branchName: "",
    },
  },
};
