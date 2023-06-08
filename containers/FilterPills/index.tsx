import { Pill } from '@/components/Pill'
import { cn } from '@/utils/functions'

export interface CategoryPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  isActive?: boolean
}

export const FilterPills = ({ children, isActive, ...rest }: CategoryPillProps) => {
  return (
    <Pill className={cn('hover:bg-amber-100', isActive && 'bg-amber-200 font-bold')} {...rest}>
      {children}
    </Pill>
  )
}
