"use client";

import type { VariantProps } from "class-variance-authority";
import { LoaderCircle } from "../../icons/LoaderCircle";
import type { buttonVariants } from "./variants";
import { Button } from ".";
import { cn } from "@/utils";

interface props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  inAction: boolean;
  inActionTitle?: string;
  onClick?: () => void;
}

export default function ActionButton({
  children,
  inAction,
  variant,
  size,
  className,
  inActionTitle = "Submitting",
  onClick,
}: props) {
  return (
    <Button
      onClick={
        onClick
          ? (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onClick();
            }
          : undefined
      }
      type="submit"
      disabled={inAction}
      variant={variant || "secondary"}
      size={size || "default"}
      className={cn(
        className,
        "inline-grid place-items-center [grid-template-areas:'stack']"
      )}
    >
      <span
        className={cn(
          inAction && "invisible",
          "flex items-center gap-2 [grid-area:stack]"
        )}
      >
        {children}
      </span>

      <span
        className={cn(
          inAction ? "visible" : "invisible",
          "flex items-center gap-2 [grid-area:stack]"
        )}
      >
        {inActionTitle && inActionTitle}
        <LoaderCircle
          aria-label="Submitting"
          className={cn(
            inAction ? "visible" : "invisible",
            "size-5 animate-spin transition-opacity [grid-area:stack]"
          )}
        />
      </span>
    </Button>
  );
}
