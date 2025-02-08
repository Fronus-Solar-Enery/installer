import { checkStatus } from "@/services/form-submission";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Badge } from "../ui/Button/Badge";
import ActionButton from "../ui/Button/actionButton";


const statusFormSchema = z.object({
  cnic: z
    .string()
    .regex(/^\d{5}-\d{7}-\d{1}$/, "CNIC must be in format 00000-0000000-0"),
});

type StatusFormData = z.infer<typeof statusFormSchema>;

export default function CheckStatus() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheckStatus = async (cnic: string) => {
    const status = await checkStatus(cnic);
    setResult(status);
  };

  const form = useForm<StatusFormData>({
    resolver: zodResolver(statusFormSchema),
    defaultValues: { cnic: "" },
  });

  const onSubmit: SubmitHandler<StatusFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      console.log(result);
      const status = await checkStatus(data.cnic);
      console.log(status);
      setResult(status);
      console.log(result);
      console.log(status);
    } catch (error) {
      setResult(null);
      toast.error("Something went wrong!", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to check status. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full p-6 bg-zinc-100 rounded-3xl shadow-xl"
        >
          <div className="flex justify-between flex-wrap mb-8">
            <h2 className="text-xl font-semibold text-zinc-900">
              Check Status
            </h2>
            <h2 className="text-xl font-semibold text-zinc-900 urdu-text">
              سٹیٹس چیک کریں
            </h2>
          </div>

          <FormField
            control={form.control}
            name="cnic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between flex-wrap mb-3">
                  <span>CNIC Number</span>
                  <span className="urdu-text">شناختی کارڈ نمبر</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="00000-0000000-0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const formattedValue = value
                        .replace(/[^\d]/g, "")
                        .split("")
                        .reduce((acc, digit, index) => {
                          if (index === 5 || index === 12) acc += "-";
                          return acc + digit;
                        }, "")
                        .slice(0, 15);
                      form.setValue("cnic", formattedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {result && (
            <>
              {result.registered && (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium dark:text-secondary-900">
                      Status
                    </span>
                    <Badge variant={result.registered ? "success" : "error"}>
                      {result.registered ? "Registered" : "Not Registered"}
                    </Badge>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary-400">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Full Name:</span>
                        <span>{result.fullName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>City:</span>
                        <span>{result.city}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Registration Date:</span>
                        <span>{result.registeredDate}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <ActionButton
            inAction={isSubmitting}
            variant="secondary"
            size="lg"
            inActionTitle="Checking"
            className="w-full py-6 rounded-2xl"
          >
            {isSubmitting ? "Checking..." : "Check Status / سٹیٹس چیک کریں"}
          </ActionButton>
        </form>
      </Form>
    </section>
  );
}
