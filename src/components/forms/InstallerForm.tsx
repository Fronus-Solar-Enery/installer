import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import CitySelect from "../cities";
import ProvinceSelect from "../provinces";
import { InstallerFormField } from "./installer-fields";
import ActionButton from "../ui/Button/actionButton";
import { InstallerBankField, InstallerContactField, InstallerFormData } from "@/types/form-types";
import { installerFormSchema } from "@/utils/validations";
import { defaultFormValues, paymentMethods } from "@/config/form-config";
import { submitForm } from "@/services/form-submission";
import { capitalizeWords, maskCNIC, maskPhoneNumber } from "@/utils/utils";

export function InstallerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<InstallerFormData>({
    resolver: zodResolver(installerFormSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = async (data: InstallerFormData) => {
    setIsSubmitting(true);
    try {
      const isSubmitted = await submitForm(data);

      if (isSubmitted) {
        // toast.success("تعاون کا شکریہ", {
        //   description: "Form has been submitted successfully!",
        //   duration: 5000,
        // });
        form.reset();
      }
    } catch (error) {
      toast.error("درخواست میں خرابی", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit form. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 mt-4 w-full mx-auto p-6 bg-secondary-100 shadow-xl rounded-3xl"
      >
        <div className="flex justify-between flex-wrap mb-8">
          <h2 className="text-xl font-semibold text-zinc-900">
            Installer Information
          </h2>
          <h2 className="text-xl font-semibold text-zinc-900 urdu-text">
            انسٹالر کی معلومات
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <InstallerFormField
            control={form.control}
            name="installer.fullName"
            label="Full Name"
            labelUrdu="پورا نام"
            placeholder="Enter full name"
          />

          {/* CNIC Field with formatter */}
          <InstallerFormField
            control={form.control}
            name="installer.cnic"
            label="CNIC Number"
            labelUrdu="شناختی کارڈ نمبر"
            placeholder="00000-0000000-0"
            inputProps={{ maxLength: 15 }}
            validation={{
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const maskedValue = maskCNIC(e.target.value);
                form.setValue("installer.cnic", maskedValue);
              },
            }}
          />

          {/* Phone Number Fields */}
          {(["cellNumber", "whatsappNumber"] as const).map(
            (field: InstallerContactField) => (
              <InstallerFormField
                key={field}
                control={form.control}
                name={`installer.${field}` as const}
                label={
                  field === "cellNumber" ? "Cell Number" : "Add WhatsApp Number"
                }
                labelUrdu={
                  field === "cellNumber" ? "موبائل نمبر" : "واٹس ایپ نمبر"
                }
                placeholder="03XXXXXXXXX"
                inputProps={{ maxLength: 11 }}
                validation={{
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const maskedValue = maskPhoneNumber(e.target.value);
                    if (maskedValue) {
                      form.setValue(`installer.${field}`, maskedValue);
                    }
                  },
                }}
              />
            )
          )}

          {/* Address Fields */}
          <InstallerFormField
            control={form.control}
            name="installer.address"
            label="Full Address"
            labelUrdu="مکمل پتہ"
            placeholder="House, Street, Landmark"
          />

          {/* City and Province Selection */}
          <FormField
            control={form.control}
            name="installer.city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex justify-between flex-wrap">
                  <span>City</span> <span className="urdu-text">شہر</span>
                </FormLabel>
                <FormControl>
                  <CitySelect
                    name="city"
                    id="city"
                    required={true}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select your city / شہر منتخب کریں"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="installer.province"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between flex-wrap">
                  <span>Province</span>
                  <span className="urdu-text">صوبہ</span>
                </FormLabel>
                <FormControl>
                  <ProvinceSelect
                    name="province"
                    id="province"
                    required={true}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select your province / صوبہ منتخب کریں"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Name */}
          <InstallerFormField
            control={form.control}
            name="installer.companyName"
            label="Company/Dealer Name"
            labelUrdu="کمپنی/ڈیلر کا نام"
            placeholder="Enter company name"
          />

          {/* Payment Method Selection */}
          <FormField
            control={form.control}
            name="installer.paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between flex-wrap">
                  <span>Payment Method</span>
                  <span className="urdu-text">ادائیگی کا طریقہ</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      {field.value ? (
                        <div className="flex gap-4 font-medium text-zinc-900">
                          <span>
                            {
                              paymentMethods.find(
                                (opt) => opt.value === field.value
                              )?.label
                            }
                          </span>
                          <span className="urdu-text">
                            {
                              paymentMethods.find(
                                (opt) => opt.value === field.value
                              )?.labelUrdu
                            }
                          </span>
                        </div>
                      ) : (
                        <span className="text-zinc-400 font-normal">
                          Select Payment Method / ادائیگی کا طریقہ منتخب کریں
                        </span>
                      )}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {paymentMethods.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col gap-2">
                          <span className="urdu-text">{option.labelUrdu}</span>
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bank Details */}
          {form.watch("installer.paymentMethod") === "bankaccount" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(["bankName", "accountTitle", "branchName"] as const).map(
                (field: InstallerBankField) => (
                  <InstallerFormField
                    key={field}
                    control={form.control}
                    name={`installer.bankDetails.${field}` as const}
                    label={
                      field === "bankName"
                        ? "Bank Name"
                        : field === "accountTitle"
                        ? "Account Title"
                        : "Branch Name"
                    }
                    labelUrdu={
                      field === "bankName"
                        ? "بینک کا نام"
                        : field === "accountTitle"
                        ? "اکاؤنٹ کا نام"
                        : "برانچ کا نام"
                    }
                    placeholder={
                      field === "bankName"
                        ? "Enter bank name"
                        : field === "accountTitle"
                        ? "Name on bank account"
                        : "Branch name and code"
                    }
                  />
                )
              )}
              <InstallerFormField
                control={form.control}
                name="installer.accountNumber"
                label="Account Number"
                labelUrdu="اکاؤنٹ نمبر"
                placeholder="Enter account number"
                inputProps={{
                  type: "text",
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                validation={{
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    form.setValue("installer.accountNumber", value);
                  },
                }}
              />
            </div>
          ) : (
            <InstallerFormField
              control={form.control}
              name="installer.accountNumber"
              label={`${capitalizeWords(
                form.watch("installer.paymentMethod") || ""
              )} Account Number`}
              labelUrdu={`${capitalizeWords(
                form.watch("installer.paymentMethod") || ""
              )} اکاؤنٹ نمبر`}
              placeholder="03XXXXXXXXX"
              inputProps={{
                maxLength: 11,
                type: "text",
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              validation={{
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  if (form.watch("installer.paymentMethod") === "bankaccount") {
                    form.setValue("installer.accountNumber", value);
                  } else {
                    const maskedValue = maskPhoneNumber(value);
                    form.setValue(
                      "installer.accountNumber",
                      maskedValue || value
                    );
                  }
                },
              }}
            />
          )}
        </div>

        <ActionButton
          inAction={isSubmitting}
          variant="secondary"
          size="lg"
          className="w-full py-6 rounded-2xl"
        >
          {isSubmitting ? "Submitting..." : "Submit / جمع کرائیں"}
        </ActionButton>
      </form>
    </Form>
  );
}
