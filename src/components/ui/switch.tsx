"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input"> & { checked?: boolean; onCheckedChange?: (checked: boolean) => void }
>(({ className, checked, onCheckedChange, ...props }, ref) => (
  <label className="toggle-switch">
    <input
      type="checkbox"
      ref={ref}
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className={className}
      {...props}
    />
    <span className="toggle-slider"></span>
  </label>
))
Switch.displayName = "Switch"

export { Switch }
