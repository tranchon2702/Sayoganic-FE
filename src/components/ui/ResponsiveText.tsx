import React from 'react';
import { responsiveFontSize, classNames } from '@/utils/responsive';

interface ResponsiveTextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  as?: React.ElementType;
  className?: string;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
}

/**
 * A responsive text component that automatically adjusts font size
 * based on screen size.
 * 
 * @param children The content to be rendered
 * @param size Base font size (defaults to 'base')
 * @param as The HTML element to render (default: p)
 * @param className Additional CSS classes to apply
 * @param weight Font weight
 * @param color Text color
 */
const ResponsiveText = ({
  children,
  size = 'base',
  as: Component = 'p',
  className,
  weight,
  color,
}: ResponsiveTextProps) => {
  const fontClasses = responsiveFontSize(size);
  
  const weightClass = weight ? {
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold',
  }[weight] : '';
  
  const colorClass = color || '';

  return (
    <Component
      className={classNames(
        fontClasses.base,
        fontClasses.md,
        fontClasses.lg,
        weightClass,
        colorClass,
        className
      )}
    >
      {children}
    </Component>
  );
};

export default ResponsiveText; 