import { cn } from "@/utils";


interface PictureCardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  badge?: {
    text: string;
    variant?: "secondary" | "primary";
  };
}

export default function PictureCard({
  title = "Modern Design Systems",
  subtitle = "Explore the fundamentals of contemporary UI design",
  image = "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg",
  badge = { text: "New", variant: "secondary" },
}: PictureCardProps) {
  return (
    <div className="block w-full max-w-[280px] group">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-white/80 dark:bg-zinc-900/80",
          "backdrop-blur-xl",
          "border-2 border-secondary-200 dark:border-secondary-900",
          "shadow-xs",
          "transition-all duration-300",
          "hover:shadow-md",
          "hover:border-zinc-300/50 dark:hover:border-secondary-800"
        )}
      >
        <div className="relative h-[320px] overflow-hidden">
          <img src={image} alt={title} className="object-cover size-full" />
        </div>

        <div
          className={cn(
            "absolute inset-0",
            "bg-linear-to-t from-secondary-1100 via-secondary-900/50 to-transparent"
          )}
        />

        <div className="absolute top-3 right-3">
          <span
            className={cn(
              "px-3 py-2 rounded-full text-sm font-semibold",
              badge.variant === "secondary" && "bg-secondary-1100 text-white",
              badge.variant === "primary" &&
                "bg-primary-900 dark:bg-primary-800 text-white"
            )}
          >
            {badge.text}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex items-center justify-center w-full">
            <div className="space-y-1.5">
              <h3 className="text-lg fot-medium text-white dark:text-secondary-400 leading-snug urdu-text mb-4">
                {subtitle}
              </h3>
              <h3 className="text-lg font-medium text-white dark:text-secondary-400 leading-snug">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
