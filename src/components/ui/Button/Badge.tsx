"use client";

import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg text-xs font-medium transition-colors focus:outline-none ",
  {
    variants: {
      variant: {
        default: "bg-primary-900 text-white ring-primary",
        outline: "bg-background text-foreground-light ring-border",
        // Log-specific variants
        error: "bg-red-500/10 text-red-600 ring-red-500/30",
        warning: "bg-yellow-500/10 text-yellow-600 ring-yellow-500/30",
        success: "bg-green-500/10 text-green-600 ring-green-500/30",
        info: "bg-blue-500/10 text-blue-600 ring-blue-500/30",
        debug: "bg-gray-500/10 text-gray-600 ring-gray-500/30",
        performance: "bg-purple-500/10 text-purple-600 ring-purple-500/30",
        security: "bg-orange-500/10 text-orange-600 ring-orange-500/30",
        user: "bg-teal-500/10 text-teal-600 ring-teal-500/30",
        log: "bg-neu-800/10 text-neu-800 ring-neu-800/30",
      },
      size: {
        xs: "px-1.5 py-0.5 text-xs",
        sm: "pl-1.5 pr-2 py-1 text-xs leading-none",
        md: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  dot?: boolean;
  disabled?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    { className, variant, size, dot, icon, disabled, children, ...props },
    ref
  ) => {
    const getBgColor = (variant: BadgeProps["variant"]) => {
      return variant === "outline" ? "bg-foreground" : "bg-current";
    };

    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant, size }),
          disabled &&
            "opacity-50 cursor-not-allowed pointer-events-none select-none",
          className
        )}
        {...props}
        role="button"
        aria-disabled={disabled}
      >
        {dot && (
          <span
            className={cn("mr-1.5 h-2 w-2 rounded-full", getBgColor(variant))}
          />
        )}
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
