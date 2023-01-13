import { useRef, useEffect, useCallback } from "react";

/**
 * @param {Function} onIntersect Function to call once intersected
 * @param {Object} optionsData Options object used to initialize IntersectionObserver
 * @param {boolean} onlyOnce Whether to stop observing after onIntersect is fired once
 *
 * @returns {Object} A ref object created by useRef. Use this to assign to the element you want to observe.
 *
 * Usage:
 * const Component = () => {
 *   const targetRef = useIntersect(() => console.log('impressed!'));
 *
 *   return <div ref={targetRef}>Something here</div>
 * }
 */

const initialOptions = {
  root: null,
  rootMargin: "0px",
  threshold: [0.05, 0.3, 0.6, 0.95],
};

const useIntersect = (
  onIntersect: () => any,
  optionsData = {},
  onlyOnce = false
) => {
  const intersected = useRef(false);
  const targetRef = useRef<any>(null);
  const observer = useRef<any>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options =
    typeof optionsData === "object"
      ? { ...initialOptions, ...optionsData }
      : initialOptions;

  const handleIntersect = useCallback(
    (entries: any) => {
      const isIntersecting = entries?.[0]?.isIntersecting || false;

      if (isIntersecting) {
        onIntersect();

        if (!intersected.current && observer.current && onlyOnce) {
          observer.current.disconnect();
          observer.current = null;
          intersected.current = true;
        }
      }
    },
    [onIntersect, observer, intersected, onlyOnce]
  );

  useEffect(() => {
    // Check browser support for `IntersectionObserver`
    const isSupportedIO = "IntersectionObserver" in window;
    if (!isSupportedIO) {
      return;
    }

    if (!intersected.current && !observer.current && targetRef.current) {
      observer.current = new IntersectionObserver(handleIntersect, options);
      observer.current.observe(targetRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, [handleIntersect, options]);

  return targetRef;
};

export default useIntersect;
