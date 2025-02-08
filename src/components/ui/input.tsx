import { cn } from "@/utils";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-xl border px-3 py-4 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm",
          "border-zinc-300 bg-transparent placeholder:text-zinc-500",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "text-zinc-800",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
