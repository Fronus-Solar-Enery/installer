import { cva } from "class-variance-authority";

const baseStyles = [
  "inline-flex relative items-center justify-center",
  "gap-1.5 text-sm tracking-wide select-none",
  "focus-visible:outline-2",
  "disabled:pointer-events-none disabled:opacity-50",
  "cursor-pointer transition-colors duration-500",
  "active:translate-y-[1px] overflow-hidden whitespace-nowrap",
];

export const variants = {
  default: [
    "bg-zinc-300/70 text-zinc-900",
    "hover:bg-zinc-400/60 hover:text-zinc-950",
    "dark:bg-zinc-800 dark:text-zinc-300",
    "dark:hover:bg-zinc-950 dark:hover:text-zinc-200",
    "focus-visible:outline-zinc-600/90 focus-visible:dark:outline-zinc-700",
  ].join(" "),

  primary: [
    "bg-primary-900 text-white",
    "hover:bg-primary-1000",
    "dark:bg-primary-900 dark:text-primary-300",
    "dark:hover:bg-primary-800 dark:hover:text-white",
    "focus-visible:outline-primary-1000 focus-visible:dark:outline-primary-700",
  ].join(" "),

  secondary: [
    "bg-secondary-800 text-secondary-100",
    "hover:bg-secondary-1000 hover:text-secondary-100",
    "dark:bg-secondary-900 dark:text-secondary-300",
    "dark:hover:bg-secondary-1200 dark:hover:text-secondary-100",
    "focus-visible:outline-primary-800 focus-visible:dark:outline-primary-800",
  ].join(" "),

  neutral: [
    "text-zinc-800 bg-zinc-300/50",
    "hover:text-zinc-1100 hover:bg-zinc-400/70",
    "dark:text-zinc-500 dark:bg-transparent",
    "dark:hover:text-zinc-400 dark:hover:bg-zinc-950/50",
    "focus-visible:outline-zinc-500 focus-visible:dark:outline-zinc-800",
  ].join(" "),

  danger: [
    "bg-rose-200 text-rose-500",
    "hover:bg-rose-300/80 hover:text-rose-600",
    "dark:bg-rose-700/20 dark:text-rose-400",
    "dark:hover:bg-rose-700/30 dark:hover:text-rose-300",
    "focus-visible:outline-rose-500 focus-visible:dark:outline-rose-400",
  ].join(" "),

  link: [
    "bg-transparent text-secondary",
    "hover:underline",
    "dark:bg-transparent dark:text-zinc-400",
    "dark:hover:text-zinc-100",
    "focus-visible:outline-zinc-500 focus-visible:dark:outline-zinc-600",
  ].join(" "),

  info: [
    "bg-cyan-500 text-white",
    "hover:bg-cyan-600",
    "dark:bg-cyan-600 dark:text-cyan-100",
    "dark:hover:bg-cyan-500 dark:hover:text-zinc-100",
    "focus-visible:outline-cyan-700 focus-visible:dark:outline-cyan-300",
  ].join(" "),

  success: [
    "bg-teal-500 text-white",
    "hover:bg-teal-600",
    "dark:bg-teal-600 dark:text-white",
    "dark:hover:bg-teal-500 dark:hover:text-white",
    "focus-visible:outline-teal-700 focus-visible:dark:outline-teal-200",
  ].join(" "),

  warning: [
    "bg-yellow-500 text-white",
    "hover:bg-yellow-600",
    "dark:bg-yellow-500 dark:text-white",
    "dark:hover:bg-yellow-600",
    "focus-visible:outline-yellow-700 focus-visible:dark:outline-yellow-300",
  ].join(" "),

  dark: [
    "bg-zinc-950/90 text-white",
    "hover:bg-zinc-1100",
    "dark:bg-zinc-950 dark:text-white",
    "dark:hover:bg-zinc-1100",
    "focus-visible:outline-zinc-500 focus-visible:dark:outline-zinc-300",
  ].join(" "),

  "outline-primary": [
    "border border-primary-900 text-primary-900 bg-transparent",
    "hover:bg-primary-900 hover:text-white",
    "dark:border-primary-800 dark:text-primary-700",
    "dark:hover:border-primary-900 dark:hover:bg-primary-900 dark:hover:text-primary-100",
    "focus-visible:outline-primary-900 focus-visible:dark:outline-primary-700",
  ].join(" "),

  "outline-info": [
    "border border-cyan-500 text-cyan-500 bg-transparent",
    "hover:bg-cyan-500 hover:text-white",
    "dark:border-cyan-600 dark:text-cyan-400",
    "dark:hover:bg-cyan-600 dark:hover:text-cyan-100",
    "focus-visible:outline-cyan-900 focus-visible:dark:outline-cyan-300",
  ].join(" "),

  "outline-success": [
    "border border-teal-500 text-teal-500 bg-transparent",
    "hover:bg-teal-500 hover:text-white",
    "dark:border-teal-600 dark:text-teal-400",
    "dark:hover:bg-teal-600 dark:hover:text-white",
    "focus-visible:outline-teal-600 focus-visible:dark:outline-teal-300",
  ].join(" "),

  "outline-warning": [
    "border border-yellow-500 text-yellow-500 bg-transparent",
    "hover:bg-yellow-500 hover:text-white",
    "dark:border-yellow-500 dark:text-yellow-400",
    "dark:hover:bg-yellow-500 dark:hover:text-white",
    "focus-visible:outline-yellow-600 focus-visible:dark:outline-yellow-300",
  ].join(" "),

  "outline-danger": [
    "border border-rose-500 text-rose-500 bg-transparent",
    "hover:bg-rose-500 hover:text-white",
    "dark:border-rose-500 dark:text-rose-500",
    "dark:hover:bg-rose-600 dark:hover:text-white",
    "focus-visible:outline-rose-600 focus-visible:dark:outline-rose-500",
  ].join(" "),

  "outline-dark": [
    "border border-zinc-800 text-zinc-800 bg-transparent",
    "hover:bg-zinc-800 hover:text-white",
    "dark:border-zinc-400 dark:text-zinc-400",
    "dark:hover:bg-zinc-900 dark:hover:text-white",
    "focus-visible:outline-zinc-800 focus-visible:dark:outline-zinc-500",
  ].join(" "),
} as const;

export const sizes = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  default: "px-6 py-3 text-sm",
  lg: "px-10 py-5 text-base",
  xl: "px-14 py-6 text-lg",
  icon: "p-3 !aspect-square",
} as const;

export const rounded = {
  none: "",
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  full: "rounded-full",
} as const;

export const buttonVariants = cva(baseStyles, {
  variants: {
    variant: variants,
    size: sizes,
    rounded,
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    rounded: "lg",
  },
});
