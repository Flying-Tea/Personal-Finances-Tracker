import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import clsx from "clsx"

const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background [&>svg]:size-3 gap-1",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-transparent hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground border-transparent hover:bg-destructive/90",
        outline:
          "text-foreground border border-border hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
extends React.HTMLAttributes<HTMLSpanElement>,
VariantProps<typeof badgeVariants> {}


export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  ...props
  }) => {
  return (
  <span className={clsx(badgeVariants({ variant}), className)} {...props} />
  );
};
