"use client";

import { Slot } from "@radix-ui/react-slot";
import React, { useEffect, useState } from "react";
import { buttonVariants, variants, sizes, rounded } from "./variants";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  rippleColor?: string;
  duration?: string;
  href?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  rounded?: keyof typeof rounded;
  ripple?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      rounded = "lg",
      asChild = false,
      ripple = true,
      rippleColor = "#ffffff",
      duration = "600",
      onClick,
      children,
      href,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : href ? "a" : "button";
    const [ripples, setRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      if (ripple) {
        const button = event.currentTarget as HTMLElement;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        setRipples([...ripples, { x, y, size, key: Date.now() }]);
      }
      onClick?.(event as React.MouseEvent<HTMLButtonElement>);
    };

    useEffect(() => {
      if (ripples.length > 0) {
        const last = ripples[ripples.length - 1];
        const timeout = setTimeout(() => {
          setRipples(ripples.filter((r) => r.key !== last.key));
        }, parseInt(duration));
        return () => clearTimeout(timeout);
      }
    }, [ripples, duration]);

    return (
      <Comp
        // @ts-expect-error ref might differ for anchor vs. button
        ref={ref}
        {...(href ? { href } : {})}
        className={buttonVariants({ variant, size, rounded, className })}
        onClick={href ? undefined : handleClick}
        {...props}
      >
        {children}
        <span className="pointer-events-none absolute inset-0 !ease-fluid overflow-hidden">
          {ripples.map((r) => (
            <span
              key={r.key}
              className="absolute rounded-full opacity-5 animate-ripple"
              style={{
                width: r.size,
                height: r.size,
                top: r.y,
                left: r.x,
                backgroundColor: rippleColor,
              }}
            />
          ))}
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
