import { BREAKPOINTS } from '@/hooks/use-mobile';

/**
 * Responsive utility functions for consistent responsive design
 */

/**
 * Get a CSS value that changes based on screen size
 * @param values Object with values for different breakpoints
 * @returns CSS clamp function string
 * 
 * @example
 * // Returns "clamp(1rem, 5vw, 2rem)"
 * responsiveValue({ base: '1rem', md: '1.5rem', lg: '2rem' })
 */
export function responsiveValue(values: {
  base: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string {
  // Extract numeric values and units
  const extractValue = (val: string): [number, string] => {
    const match = val.match(/^([\d.]+)(\w+|%)$/);
    if (!match) throw new Error(`Invalid CSS value: ${val}`);
    return [parseFloat(match[1]), match[2]];
  };

  // Find min and max values with the same unit
  const baseVal = extractValue(values.base);
  const maxKey = Object.keys(values).reduce((max, key) => 
    key !== 'base' && values[key as keyof typeof values] ? key : max, 'base');
  
  if (maxKey === 'base') {
    return values.base; // Only base value provided
  }

  const maxVal = extractValue(values[maxKey as keyof typeof values] as string);
  
  // Only create clamp if units match
  if (baseVal[1] === maxVal[1]) {
    return `clamp(${values.base}, 5vw, ${values[maxKey as keyof typeof values]})`;
  }
  
  // Fallback to media queries (handled by Tailwind)
  return values.base;
}

/**
 * Generate responsive font size classes
 * @param size Base size name (text-xs, text-sm, etc.)
 * @returns Object with responsive classes
 * 
 * @example
 * // Returns { base: 'text-sm', md: 'md:text-base', lg: 'lg:text-lg' }
 * responsiveFontSize('sm')
 */
export function responsiveFontSize(size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'): Record<string, string> {
  const sizeMap: Record<string, string[]> = {
    'xs': ['text-xs', 'md:text-sm'],
    'sm': ['text-sm', 'md:text-base', 'lg:text-lg'],
    'base': ['text-base', 'md:text-lg', 'lg:text-xl'],
    'lg': ['text-lg', 'md:text-xl', 'lg:text-2xl'],
    'xl': ['text-xl', 'md:text-2xl', 'lg:text-3xl'],
    '2xl': ['text-2xl', 'md:text-3xl', 'lg:text-4xl'],
    '3xl': ['text-3xl', 'md:text-4xl', 'lg:text-5xl', 'xl:text-6xl'],
  };

  const classes = sizeMap[size] || [`text-${size}`];
  
  return {
    base: classes[0],
    md: classes[1] || '',
    lg: classes[2] || '',
    xl: classes[3] || '',
  };
}

/**
 * Generate responsive spacing classes
 * @param property CSS property (p, px, py, m, mx, my, etc.)
 * @param size Base size (0, 1, 2, etc.)
 * @returns String with responsive classes
 * 
 * @example
 * // Returns "p-2 md:p-4 lg:p-6"
 * responsiveSpacing('p', 2)
 */
export function responsiveSpacing(
  property: 'p' | 'px' | 'py' | 'pt' | 'pr' | 'pb' | 'pl' | 'm' | 'mx' | 'my' | 'mt' | 'mr' | 'mb' | 'ml',
  size: number
): string {
  if (size <= 0) return `${property}-0`;
  
  const mdSize = size < 4 ? size + 1 : size + 2;
  const lgSize = size < 4 ? size + 2 : size + 4;
  
  return `${property}-${size} md:${property}-${mdSize} lg:${property}-${lgSize}`;
}

/**
 * Generate responsive grid/flex classes
 * @param baseColumns Number of columns on mobile
 * @param mdColumns Number of columns on medium screens
 * @param lgColumns Number of columns on large screens
 * @param xlColumns Number of columns on extra large screens
 * @returns String with responsive grid classes
 * 
 * @example
 * // Returns "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
 * responsiveGrid(1, 2, 3, 4)
 */
export function responsiveGrid(
  baseColumns: number,
  mdColumns: number,
  lgColumns: number,
  xlColumns?: number
): string {
  let classes = `grid-cols-${baseColumns} md:grid-cols-${mdColumns} lg:grid-cols-${lgColumns}`;
  
  if (xlColumns) {
    classes += ` xl:grid-cols-${xlColumns}`;
  }
  
  return classes;
}

/**
 * Helper to conditionally join class names
 * @param classes Class names or conditional class objects
 * @returns Joined class string
 * 
 * @example
 * // Returns "btn btn-primary active"
 * classNames('btn', 'btn-primary', { active: true, disabled: false })
 */
export function classNames(...classes: (string | Record<string, boolean> | undefined)[]): string {
  return classes
    .filter(Boolean)
    .map(cls => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object') {
        return Object.entries(cls)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .trim();
}

/**
 * Convert breakpoint name to pixel value
 * @param breakpoint Breakpoint name
 * @returns Pixel value
 */
export function getBreakpointPixels(breakpoint: keyof typeof BREAKPOINTS): number {
  return BREAKPOINTS[breakpoint];
}

/**
 * Check if a breakpoint is active (for client-side only)
 * @param breakpoint Breakpoint to check
 * @returns Boolean indicating if screen width is below breakpoint
 */
export function isBreakpointActive(breakpoint: keyof typeof BREAKPOINTS): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < BREAKPOINTS[breakpoint];
} 