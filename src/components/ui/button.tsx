import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-primary shadow-md text-primary-foreground hover:bg-primary/90 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        outline:
          "border border-primary text-primary shadow-md hover:bg-primary/10 dark:hover:bg-primary/15 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        danger:
          "bg-danger text-danger-foreground shadow-md hover:bg-danger/90 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-danger",
        dangerOutline:
          "border border-danger text-danger shadow-md hover:bg-danger/10 dark:hover:bg-danger/15 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ghost: "hover:bg-slate-600/5 dark:hover:bg-white/5",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
