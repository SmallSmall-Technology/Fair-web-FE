import { useMemo } from 'react';

function useMobileOS() {
  return useMemo(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) return 'Android';
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 'iOS';

    return 'Desktop';
  }, []);
}

export default useMobileOS;
