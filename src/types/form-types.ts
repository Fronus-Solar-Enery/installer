export interface InstallerFormData {
    installer: {
      fullName: string;
      cnic: string;
      cellNumber: string;
      whatsappNumber: string;
      address: string;
      city: string;
      province: string;
      companyName: string;
      paymentMethod:
      | "easypaisa"
      | "jazzcash"
      | "upaisa"
      | "sadapay"
      | "nayapay"
      | "bankaccount";
      accountNumber: string; // Change from number | null to string
      bankDetails: {
        bankName: string;
        accountTitle: string;
        branchName: string;
      };
    };
  }
  
  // Add a type for form field paths
  export type InstallerFormPath =
    | "installer.fullName"
    | "installer.cnic"
    | "installer.cellNumber"
    | "installer.whatsappNumber"
    | "installer.address"
    | "installer.city"
    | "installer.province"
    | "installer.companyName"
    | "installer.paymentMethod"
    | "installer.accountNumber"
    | "installer.bankDetails.bankName"
    | "installer.bankDetails.accountTitle"
    | "installer.bankDetails.branchName";
  
  export type InstallerContactField = "cellNumber" | "whatsappNumber";
  export type InstallerBankField = "bankName" | "accountTitle" | "branchName";
  