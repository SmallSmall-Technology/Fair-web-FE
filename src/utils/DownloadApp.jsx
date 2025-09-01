import React from 'react';
import useMobileOS from '../hooks/useMobileOS';

function DownloadApp() {
  const os = useMobileOS();

  const handleDownload = () => {
    if (os === 'Android') {
      window.location.href =
        'https://play.google.com/store/apps/details?id=com.smallsmallfair.app';
    } else if (os === 'iOS') {
      window.location.href =
        'https://apps.apple.com/pa/app/smallsmall/id6550924061';
    } else {
      window.location.href =
        'https://play.google.com/store/apps/details?id=com.smallsmallfair.app'; // fallback page
    }
  };

  return (
    <a
      onClick={handleDownload}
      aria-label="Download our mobile app"
      className="cursor-pointer text-[#737376] hover:text-black focus:text-black focus:outline-none focus:ring-2 focus:ring-black transition-colors motion-safe:duration-200 hover:underline"
    >
      Download app
      <img
        src="/images/mobile-phone.svg"
        alt="Mobile phone icon"
        width={24}
        height={24}
        className="inline-block ml-1 transition-transform hover:scale-110 motion-safe:duration-200"
        loading="lazy"
      />
    </a>

    // <a
    //   onClick={handleDownload}
    //   className="cursor-pointer text-blue-600 underline"
    // >
    //   Download App
    // </a>
  );
}

export default DownloadApp;
