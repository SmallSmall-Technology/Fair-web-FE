import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import React from 'react';
import Logo from '../../ui/components/Logo';

const Login = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen ">
        <div className="hidden bg-[var(--yellow-primary)] w-full md:w-1/3  p-8 lg:flex flex-col py-8">
          <div className="space-y-4">
            <p className=" text-4xl font-normal">Your needs can’t wait</p>
            <p className=" text-5xl font-normal">Meet them on</p>
            <p className=" text-7xl font-bold">Fair</p>
          </div>
          <div className="mt-8  lg:h-[357px] lg:w-[355px]">
            <img
              src="/images/login-img.svg"
              alt=""
              className="w-full lg:h-full md:w-2/3 xl:w-full"
            />
          </div>
        </div>

        <div className="flex-1 py-6  px-5 flex flex-col items-center w-[100%] 2xl:w-full mx-auto lg:w-2/3 lg:pl-36">
          <div className="w-full ">
            <div className=" flex justify-center mb-10 lg:mb-5 text-center w-full  lg:justify-end lg:pr-8">
              <Logo />
            </div>

            <div className="mb-8 text-center">
              <h1 className="text-3xl font-semibold mb-3 lg:text-start xl:text-cente">
                Login
              </h1>
              <p className="text-sm text-gray-500 hidden lg:flex xl:mx-auto xl:justify-cente">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <p className="text-sm text-gray-500 md:hidden">
                New to Fair?{' '}
                <Link to="/sign-up" className="text-blue-600">
                  Create account
                </Link>
              </p>
            </div>

            {/* <div className="lg:flex lg:justify-start lg:items-start lg:mr-20 w-full border"> */}
            <div className="flex justify-center lg:justify-start">
              <LoginForm />
            </div>
            {/* </div> */}

            <div className="text-center mt-4 flex flex-col justify-center lg:max-w-md lg:justify-start items-center ">
              <p className="text-xs text-gray-600">
                By clicking login, you agree to our
              </p>
              <p className="text-xs">
                <Link to="#" className="text-red-600">
                  Terms of use
                </Link>{' '}
                and{' '}
                <Link to="#" className="text-red-600">
                  privacy policy
                </Link>
              </p>
            </div>

            <div className="hidden lg:grid 2xl:mx-auto justify-cente items-center">
              <hr className="my-3 max-w-md" />

              <div className="text-center grid gap-5 max-w-md lg:mx-aut">
                <p className="text-sm">New to Fair?</p>
                <Link
                  to="/sign-up"
                  className="bg-[#FFF8CF] rounded-full border-bg-[var(--yellow-primary)]  w-full px-8 py-3 text-lg font-medium text-black hover:bg-[var(--yellow-primary)] hover:text-black"
                >
                  Create account
                </Link>
              </div>
            </div>

            <div className="mt-8 grid justify-items-center lg:hidden">
              <img
                src="/images/login-img.svg"
                alt=""
                className="h-[144px] w-[145px] mb-10"
              />
              <p className="text-lg font-normal">Your needs can’t wait</p>
              <p className="text-3xl font-normal">Meet them on</p>
              <p className="text-3xl font-bold">Smallsmall</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
