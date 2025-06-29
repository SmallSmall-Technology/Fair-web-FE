import { useEffect, useRef, useState } from 'react';

export const useIsInView = () => {
  const ref = useRef();
  const [inView, setInView] = useState(false);
  const [hasIntersectedOnce, setHasIntersectedOnce] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNowInView = entry.isIntersecting;
        setInView(isNowInView);

        if (isNowInView && !hasIntersectedOnce) {
          setHasIntersectedOnce(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasIntersectedOnce]);

  return [ref, inView, hasIntersectedOnce];
};
