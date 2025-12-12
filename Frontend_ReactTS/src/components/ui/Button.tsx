import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

const buttonStyles = cva(
  "px-4 py-2 rounded-lg font-medium transition-colors border-0 outline-none",
  {
    variants: {
      intent: {
        primaryButton: "bg-primary text-white hover:bg-primary/80", // Kept for future accessability
        secondaryButton: "bg-secondary text-white hover:bg-secondary-hover",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
      },
    },
    defaultVariants: {
      intent: "primaryButton",
      size: "md",
    },
  }
)

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button"> & { href?: string }

export function ReuseButton({ intent, size, className, href, ...props}: ButtonProps) {
  const classes = `${buttonStyles({ intent, size })}${className ? ` ${className}` : ""}`

  if (href) {
    // Render an anchor when link is provided
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      // props may contain button-specific props like onclick forms or links
      <a {...anchorProps} href={href} className={classes} />
    )
  }

  return (
    <button
      {...props}
      className={classes}
    />
  )
}