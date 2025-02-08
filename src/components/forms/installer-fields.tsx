import type { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { InstallerFormData } from "@/types/form-types";

interface InstallerFormFieldProps {
  control: Control<InstallerFormData>;
  name: any; // Keep the existing type for name
  label: string;
  labelUrdu: string;
  placeholder?: string;
  validation?: {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  // Add input-specific props
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function InstallerFormField({
  control,
  name,
  label,
  labelUrdu,
  placeholder,
  validation,
  inputProps,
}: InstallerFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex justify-between flex-wrap">
            <span>{label}</span>
            <span className="urdu-text">{labelUrdu}</span>
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              {...validation}
              {...inputProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
