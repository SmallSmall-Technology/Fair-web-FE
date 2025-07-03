import React, { useState } from 'react';
import UpdatePassword from './UpdatePassword';
import { Link, useLocation } from 'react-router-dom';
import VerifyOtp from './OTPInput';

const ResetPassword = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [verified, setVerified] = useState(null);

  return (
    <>
      <div className="">
        <div className="flex-1 py-6 px-5 flex flex-col items-start  lg:pl-36">
          <div className="w-full flex justify-center lg:justify-end">
            <Link to="/" aria-label="Fair Home">
              <img
                src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
                alt="Fair Logo"
                width={120}
                height={40}
                loading="eager"
                decoding="defer"
              />
            </Link>
          </div>
        </div>
        <section className="px-5 md:w-[480px] mx-auto grid gap-3">
          <h1 className="font-semibold text-4xl">Reset password</h1>
          <p className="font-normal text-balance text-[#96959F]">
            Enter the code sent to{' '}
            <span className="text-black">{email?.email}</span> to reset your
            password.
          </p>
          <VerifyOtp
            verified={verified}
            setVerified={setVerified}
            email={email?.email}
          />
          <hr />
          <UpdatePassword
            email={email?.email}
            verified={verified}
            setVerified={setVerified}
            disabled={verified !== true}
          />
        </section>
      </div>
    </>
  );
};

export default ResetPassword;
