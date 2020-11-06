/**
 * Delay the unmount of a component to apply an unmount animation.
 * 
 * When `setIsMounted` is called with `true`, the component is immmediately mounted. When `setIsMounted` is called with `false`, `isUnmounting` is set to `true` and `isMounted` is set to false only after the specified delay.
 * 
 * @param isInitiallyMounted If the component should initially be mounted.
 * @param unmountDelay The delay between telling the component to unmount and the component actually unmounting. If you're applying an unmount animation, this should be how long the animation is in milliseconds.
 * 
 * @returns `[[isMounted, isUnmounting], setIsMounted]`
 * 
 * @example
 * const [[isMounted, isUnmounting], setIsMounted] = useDelayedUnmount(false, 300)
 */
declare function useDelayedUnmount(isInitiallyMounted: boolean, unmountDelay: number): [[boolean, boolean], (isMounted: boolean) => void]

export = useDelayedUnmount
