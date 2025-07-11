import React from 'react';
import { classNames } from '@/utils/responsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  fluid?: boolean;
  noPadding?: boolean;
}

/**
 * A responsive container component that provides consistent width constraints
 * and padding across different screen sizes.
 * 
 * @param children The content to be rendered inside the container
 * @param className Additional CSS classes to apply
 * @param as The HTML element to render (default: div)
 * @param fluid Whether the container should be full width on all screen sizes
 * @param noPadding Whether to remove horizontal padding
 */
const ResponsiveContainer = ({
  children,
  className,
  as: Component = 'div',
  fluid = false,
  noPadding = false,
}: ResponsiveContainerProps) => {
  return (
    <Component
      className={classNames(
        fluid ? 'w-full' : 'container mx-auto',
        noPadding ? '' : 'px-4 sm:px-6 md:px-8',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default ResponsiveContainer; 