import type { ButtonHTMLAttributes, ReactNode } from 'react'

const colorClassNames = {
   primary: 'text-teal-900 hover:bg-teal-100 border border-teal-700',
   red: 'text-rose-900 hover:bg-rose-100 border border-rose-800',
} as const

export type TextButtonColor = keyof typeof colorClassNames

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   color?: TextButtonColor
   icon?: ReactNode
   children: ReactNode
}

export function TextButton({ color = 'primary', icon, children, className = '', type = 'button', ...props }: TextButtonProps) {
   const classes = ['text-xs font-medium flex leading-tight px-2 py-1 rounded-md cursor-pointer gap-1', colorClassNames[color], className].filter(Boolean).join(' ')

   return (
      <button type={type} className={classes} {...props}>
         {icon}
         {children}
      </button>
   )
}
