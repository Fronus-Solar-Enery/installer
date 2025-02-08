"use client";
import { Drawer } from "vaul";
import { cn } from "@/utils";

interface DrawerProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  titleClassName?: string;
  containerClassName?: string;
}

export function AppDrawer({
  children,
  trigger = "Open Drawer",
  className,
  contentClassName,
  overlayClassName,
  titleClassName,
  containerClassName,
  open,
  onOpenChange,
  title = "Form Dialog",
  description = "Form content",
}: DrawerProps) {
  return (
    <Drawer.Root
      dismissible={false}
      disablePreventScroll
      open={open}
      onOpenChange={onOpenChange}
    >
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay
          className={cn(
            "fixed inset-0 bg-black/40 backdrop-blur-md",
            overlayClassName
          )}
        />
        <Drawer.Content
          className={cn(
            "!bg-secondary-1000 flex flex-col rounded-t-3xl overflow-hidden mt-24 h-[96%] lg:h-[96%] fixed bottom-0 left-0 right-0 outline-none",
            contentClassName
          )}
        >
          <div className="p-4 flex-1 overflow-y-auto relative">
            <div className={cn("max-w-4xl mx-auto", containerClassName)}>
              <div
                aria-hidden
                className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-secondary-800 mb-8"
              />
              <Drawer.Title className={cn("font-medium mb-4", titleClassName)}>
                {title}
              </Drawer.Title>
              <Drawer.Description className="sr-only">
                {description}
              </Drawer.Description>
              {children}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
