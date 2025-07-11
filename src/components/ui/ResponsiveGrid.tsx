import React from 'react';
import { responsiveGrid, classNames } from '@/utils/responsive';

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    base: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number | { x?: number; y?: number };
  className?: string;
}

/**
 * A responsive grid component that automatically adjusts columns
 * based on screen size.
 * 
 * @param children The content to be rendered inside the grid
 * @param cols Number of columns at different breakpoints
 * @param gap Grid gap size (can be different for x and y)
 * @param className Additional CSS classes to apply
 */
const ResponsiveGrid = ({
  children,
  cols = { base: 1, md: 2, lg: 3 },
  gap = 4,
  className,
}: ResponsiveGridProps) => {
  // Generate responsive grid classes
  const gridColsClass = responsiveGrid(
    cols.base,
    cols.md || cols.base,
    cols.lg || cols.md || cols.base,
    cols.xl || cols.lg || cols.md || cols.base
  );
  
  // Generate gap classes
  let gapClass = '';
  if (typeof gap === 'number') {
    gapClass = `gap-${gap}`;
  } else {
    const gapX = gap.x !== undefined ? `gap-x-${gap.x}` : '';
    const gapY = gap.y !== undefined ? `gap-y-${gap.y}` : '';
    gapClass = `${gapX} ${gapY}`.trim();
  }

  return (
    <div className={classNames('grid', gridColsClass, gapClass, className)}>
      {children}
    </div>
  );
};

export default ResponsiveGrid; 