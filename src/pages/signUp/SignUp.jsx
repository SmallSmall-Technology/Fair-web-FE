import SignUpForm from './SignUpForm';
import { Link } from 'react-router-dom';
import LinkButton from '../../utils/LinkButton';
import React from 'react';
import Logo from '../../ui/components/Logo';

function SignUp() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/3 hidden md:block">
        <img
          // src="/images/signupImage.webp"
          src="/images/signupImage.webp"
          className="h-full object-cover w-full"
          alt="Background"
          loading="eager"
        />
      </div>

      <div className="flex-1 p-5 py-12 lg:w-2/3">
        <div className="flex justify-between items-center mb-10 lg:justify-end lg:pr-8 ">
          <div className="h-[50px]">
            <Logo />
          </div>
          <div className="md:hidden mt-[-12px]">
            <Link to="/login" className="text-dark">
              Log in
            </Link>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-semibold">Create your free account</h1>
            <p className="text-sm text-gray-700 font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>

          <SignUpForm />

          <div className="text-center mt-4">
            <p className="text-sm">
              By clicking Create account, you agree to our
            </p>
            <p className="text-sm">
              <Link to="#" className="text-red-700 underline ">
                Terms of use
              </Link>{' '}
              and{' '}
              <Link to="#" className="text-red-700 underline">
                privacy policy
              </Link>
            </p>
          </div>

          <div className="my-6 hidden lg:block">
            <hr className="border-t-2 border-gray-200" />
          </div>

          <div className="hidden lg:block text-center">
            <p>Already have an account?</p>
            <LinkButton
              link="/login"
              className="w-full bg-[#FFF8CF] text-center rounded-full border-yellow-400 py-3 mt-2 text-lg font-medium text-black hover:bg-yellow-400"
            >
              Log in
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
