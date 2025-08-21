import { useMediaQuery } from 'react-responsive';

export default function FooterTop() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className=" py-6 px-4 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-start gap-6 border-b">
      {/* Contact Us */}
      <div className="space-y-2">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <img src="images/message-icon.svg" alt="" srcset="" />
          <span>Contact us </span>
        </h4>
        <span className="mr-3 inline-block">
          Questions? or Help? Call:
          <a href="tel:08056570080" className="  hover:underline">
            08056570080
          </a>
        </span>
        {isMobile ? <br /> : ''}
        <span className="mr-3 inline-block">
          Questions:
          <a href="mailto:hello@smallsmall.com" className="  hover:underline">
            hello@smallsmall.com
          </a>
        </span>
        {isMobile ? <br /> : ''}
        <span className="mr-3 inline-block">
          Help:
          <a href="mailto:support@smallsmall.com" className="  hover:underline">
            support@smallsmall.com
          </a>
        </span>
        {isMobile ? <br /> : ''}
        <div className="flex flex-wrap gap-4 pt-2 text-sm  ">
          <a href="#" className="hover:underline">
            Chat with us
          </a>
          <a href="#" className="hover:underline">
            Leave feedback
          </a>
          <a href="#" className="hover:underline">
            Shop
          </a>
        </div>
      </div>

      {/* Get the App */}
      <div className={`space-y-3 flex ${isMobile ? '' : 'w-1/2'}`}>
        <div className="flex flex-col justify-between">
          <h4 className="text-lg font-semibold flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M25.8327 40H14.166C10.031 40 6.66602 36.635 6.66602 32.5V7.5C6.66602 3.365 10.031 0 14.166 0H25.8327C29.9677 0 33.3327 3.365 33.3327 7.5V32.5C33.3327 36.635 29.9677 40 25.8327 40ZM14.166 1.66667C10.9493 1.66667 8.33268 4.28333 8.33268 7.5V32.5C8.33268 35.7167 10.9493 38.3333 14.166 38.3333H25.8327C29.0494 38.3333 31.666 35.7167 31.666 32.5V7.5C31.666 4.28333 29.0494 1.66667 25.8327 1.66667H14.166ZM23.3327 34.1667C23.3327 33.7067 22.9594 33.3333 22.4993 33.3333H17.4993C17.0393 33.3333 16.666 33.7067 16.666 34.1667C16.666 34.6267 17.0393 35 17.4993 35H22.4993C22.9594 35 23.3327 34.6267 23.3327 34.1667Z"
                fill="black"
              />
            </svg>
            <span>Get the app</span>
          </h4>
          <div className="flex items-center gap-4  mr-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.smallsmallfair.app"
              className="block"
            >
              <img
                src="/images/google-store.svg"
                alt="Get it on Google Play"
                className="h-10"
              />
            </a>
            <a
              href="https://apps.apple.com/pa/app/smallsmall/id6550924061"
              className="block"
            >
              <img
                src="/images/app-store.svg"
                alt="Download on the App Store"
                className="h-10"
                href="https://apps.apple.com/pa/app/smallsmall/id6550924061"
              />
            </a>
          </div>
        </div>
        <div className="">
          <span className="flex justify-center">
            <img
              src="/images/qr-icon.svg"
              alt="QR Code"
              className="h-20 w-20"
            />
          </span>
          <p className="text-sm mt-1">Scan to download</p>
        </div>
      </div>
    </div>
  );
}
