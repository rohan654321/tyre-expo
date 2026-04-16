'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-bebas transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-mainColor1 text-white hover:bg-black',
        primary: 'bg-mainColor1 text-white hover:bg-black',
        secondary: 'bg-transparent text-mainColor1 border-2 border-mainColor1 hover:bg-black hover:text-white hover:border-black',
        outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-6 rounded-md px-2 text-xs',
        sm: 'h-9 rounded-md px-3',
        md: 'h-10 px-5 py-2 text-xl',
        lg: 'h-11 px-10 py-3 text-2xl',
        icon: 'h-10 w-10',
        'icon-xs': 'h-6 w-6',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export function Button({ 
  className, 
  variant, 
  size, 
  href,
  target,
  rel,
  children,
  ...props 
}: ButtonProps) {
  const Comp = href ? 'a' : 'button';
  
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={buttonVariants({ variant, size, className })}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}