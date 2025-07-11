import * as React from "react"

// Define standard breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
}

type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Hook to check if screen width is below a certain breakpoint
 * @param breakpoint The breakpoint to check against (sm, md, lg, xl, 2xl)
 * @returns Boolean indicating if screen is below the specified breakpoint
 */
export function useBreakpoint(breakpoint: BreakpointKey = 'md') {
  const [isBelow, setIsBelow] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const breakpointValue = getBreakpointValue(breakpoint);
    const mql = window.matchMedia(`(max-width: ${breakpointValue - 1}px)`);
    
    const onChange = () => {
      setIsBelow(window.innerWidth < breakpointValue);
    };
    
    mql.addEventListener("change", onChange);
    setIsBelow(window.innerWidth < breakpointValue);
    
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return !!isBelow;
}

/**
 * Legacy hook for backward compatibility
 * @returns Boolean indicating if screen is below MD breakpoint (768px)
 */
export function useIsMobile() {
  return useBreakpoint('md');
}

/**
 * Get the pixel value for a named breakpoint
 */
function getBreakpointValue(breakpoint: BreakpointKey): number {
  switch (breakpoint) {
    case 'sm': return BREAKPOINTS.SM;
    case 'md': return BREAKPOINTS.MD;
    case 'lg': return BREAKPOINTS.LG;
    case 'xl': return BREAKPOINTS.XL;
    case '2xl': return BREAKPOINTS.XXL;
    default: return BREAKPOINTS.MD;
  }
}

/**
 * Hook to get all breakpoint statuses at once
 * @returns Object with boolean values for each breakpoint
 */
export function useResponsive() {
  const isMobile = useBreakpoint('sm');
  const isTablet = useBreakpoint('md') && !isMobile;
  const isDesktop = !useBreakpoint('lg');
  const isLargeDesktop = !useBreakpoint('xl');

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    // Helper for specific breakpoint checks
    below: {
      sm: isMobile,
      md: useBreakpoint('md'),
      lg: useBreakpoint('lg'),
      xl: useBreakpoint('xl'),
      '2xl': useBreakpoint('2xl'),
    }
  };
}
