interface LoaderCircleProps extends React.SVGProps<SVGSVGElement> {
  "aria-label"?: string;
}

export function LoaderCircle({
  "aria-label": ariaLabel,
  ...props
}: LoaderCircleProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={ariaLabel}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
