import { InstallerFormData } from "@/types/form-types";
import { formatDate } from "@/utils/utils";
import { toast } from "sonner";

export class FormSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FormSubmissionError";
  }
}

function flattenFormData(data: InstallerFormData) {
  const installer = data.installer;
  return {
    fullName: installer.fullName,
    cellNumber: installer.cellNumber,
    whatsappNumber: installer.whatsappNumber,
    address: installer.address,
    city: installer.city,
    province: installer.province,
    companyName: installer.companyName,
    cnic: installer.cnic,
    paymentMethod: installer.paymentMethod,
    accountNumber: installer.accountNumber || "",
    bankName: installer.bankDetails?.bankName || "",
    accountTitle: installer.bankDetails?.accountTitle || "",
    branchName: installer.bankDetails?.branchName || "",
  };
}

export async function submitForm(data: InstallerFormData): Promise<boolean> {
  try {
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyPf7R_TCzD102cyKRxgft4KTCNtamGjkRQk6GZzIeDXNLH82U6ZwydtTMFDQz90Gzh/exec";

    if (!scriptUrl) {
      throw new FormSubmissionError("Google Script URL is not configured");
    }

    const flatData = flattenFormData(data);

    const formData = new FormData();
    Object.entries(flatData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const urlEncodedData = new URLSearchParams(formData as any).toString();

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: urlEncodedData,
    });

    const result = await response.json();
    console.log(result)
    if (!result.success) {
      toast.error("Error!", {
        description: "This installer already exists.",
        duration: 5000,
        unstyled: true,
        classNames: {
          toast: "flex items-center gap-4 p-4 pr-6 bg-teal-600 rounded-2xl",
          icon: "text-rose-500 [&_svg]:size-6",
          title: "!text-rose-500",
        },
      });
      return false;
    }


    toast.success("Registered!", {
      description: `${flatData.fullName} is Registered Successfully.`,
      duration: 5000,
      unstyled: true,
      classNames: {
        toast:
          "flex items-center gap-4 p-4 pr-6 bg-teal-600 rounded-2xl",
        icon: "text-emerald-500 [&_svg]:size-6",
        title: "!text-emerald-500",
      },
    });


    return true;
  } catch (error) {
    console.error("Form submission error:", error);
    toast.error("Error!", {
      description:
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again.",
      duration: 5000,
      unstyled: true,
      classNames: {
        toast: "flex items-center gap-4 p-4 pr-6 bg-teal-600 rounded-2xl",
        icon: "text-rose-500 [&_svg]:size-6",
        title: "!text-rose-500",
      },
    });
    throw new FormSubmissionError(
      error instanceof Error ? error.message : "Failed to submit form"
    );
  }
}

export async function checkStatus(cnic: string): Promise<{
  registered: boolean;
  fullName?: string;
  registeredDate?: string;
  city?: string;
}> {
  try {
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyPf7R_TCzD102cyKRxgft4KTCNtamGjkRQk6GZzIeDXNLH82U6ZwydtTMFDQz90Gzh/exec";

    const formData = new FormData();
    formData.append("cnic", cnic);
    formData.append("action", "check");

    const urlEncodedData = new URLSearchParams(formData as any).toString();

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedData,
    });

    const result = await response.json();

    if (result.success && result.data) {
      const formattedDate = formatDate(result.data.registeredDate);
      const cityName = result.data.city;

      toast.success("Registered", {
        description: `${result.data.fullName} from ${cityName} is Registered.`,
        duration: 5000,
        unstyled: true,
        classNames: {
          toast: "flex items-center gap-4 p-4 pr-6 bg-teal-600 rounded-2xl",
          icon: "text-rose-500 [&_svg]:size-6",
          title: "!text-rose-500",
        },
      });

      return {
        registered: true,
        fullName: result.data.fullName,
        registeredDate: formattedDate,
        city: cityName,
      };
    }

    toast.info("Not Registered", {
      description: "This CNIC is not registered in our system.",
      duration: 5000,
      unstyled: true,
      classNames: {
        toast: "flex items-center gap-4 p-4 pr-6 bg-teal-600 rounded-2xl",
        icon: "text-emerald-500 [&_svg]:size-6",
        title: "!text-emerald-500",
      },
    });
    return { registered: false };
  } catch (error) {
    console.error("Status check error:", error);
    toast.error("Error", {
      description:
        error instanceof Error
          ? error.message
          : "Failed to check status. Please try again.",
      duration: 5000,
      unstyled: true,
      classNames: {
        toast: "flex items-center gap-4 p-4 pr-6 bg-teal-600 rounded-2xl",
        icon: "text-rose-500 [&_svg]:size-6",
        title: "!text-rose-500",
      },
    });
    return { registered: false };
  }
}
