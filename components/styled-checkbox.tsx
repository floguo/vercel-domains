import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import styles from './styled-checkbox.module.css'

interface StyledCheckboxProps extends React.ComponentProps<typeof Checkbox> {
  label?: string
}

export function StyledCheckbox({ label, className, ...props }: StyledCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox className={`${styles.styledCheckbox} ${className}`} {...props} />
      {label && <Label className="text-sm leading-none">{label}</Label>}
    </div>
  )
}

