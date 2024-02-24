import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

const Paper = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        {...rest}
        ref={ref}
        className={cn(
          "rounded bg-card p-4 text-card-foreground shadow",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

Paper.displayName = "Paper";

export default Paper;
