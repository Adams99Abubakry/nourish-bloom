import { Capacitor } from '@capacitor/core';
import { cn } from "@/lib/utils";
import React from 'react';

interface SafeAreaViewProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
  as?: React.ElementType;
}

export const SafeAreaView = ({ 
  children, 
  className, 
  edges = ['top', 'bottom', 'left', 'right'],
  as: Component = 'div',
  ...props 
}: SafeAreaViewProps) => {
  const isNative = Capacitor.isNativePlatform();
  const isIOS = Capacitor.getPlatform() === 'ios';

  // Only apply on native platforms if desired, or universally if using CSS env()
  // CSS env() works in mobile browsers too, so it's usually safe to always apply.
  
  const edgeClasses = edges.map(edge => {
    switch (edge) {
      case 'top': return 'pt-[env(safe-area-inset-top)]';
      case 'bottom': return 'pb-[env(safe-area-inset-bottom)]';
      case 'left': return 'pl-[env(safe-area-inset-left)]';
      case 'right': return 'pr-[env(safe-area-inset-right)]';
      default: return '';
    }
  }).join(' ');

  return (
    <Component className={cn(edgeClasses, className)} {...props}>
      {children}
    </Component>
  );
};
