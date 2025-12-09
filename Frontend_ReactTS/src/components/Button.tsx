import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const buttonStyles = cva(
  "px-4 py-2 rounded-lg font-medium transition-colors",
  {
    variants: {
      intent: {
        primary: "bg-primary text-white hover:bg-primary/80",
        secondary: "bg-secondary text-white hover:bg-secondary-hover",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
)

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

const ReuseButton = ({ intent, size, ...props}: ButtonProps) => {
    return <button {...props} className={buttonStyles({intent, size})}></button>
};

export default ReuseButton;