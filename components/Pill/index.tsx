import { cn } from '@/utils/functions'

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
}

export const Pill = ({ children, className, ...rest }: PillProps) => {
  return (
    <span
      className={cn('text-xs py-2 px-3 rounded-md cursor-pointer select-none', className)}
      {...rest}
    >
      {children}
    </span>
  )
}
