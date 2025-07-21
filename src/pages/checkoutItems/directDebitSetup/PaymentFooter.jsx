export const PaymentFooter = () => {
  return (
    <>
      <footer className="hidden lg:flex  mb-8 text-xs text-[#222224] w-full justify-center mt-20">
        <p>
          © Smallsmall Technology 2025 &nbsp; | &nbsp;{' '}
          <a href="https://smallsmall.com" className="underline">
            smallsmall.com
          </a>{' '}
          &nbsp; | &nbsp;
          <a href="#" className="underline">
            Terms of use
          </a>{' '}
          &nbsp; | &nbsp;
          <a href="#" className="underline">
            Refunds and returns
          </a>
        </p>
      </footer>
      <footer className="lg:hidden mt-20 mb-8 text-xs text-[#222224] w-full grid ">
        <div className="flex gap-3 mb-2">
          <a href="#" className="underline">
            Refunds and returns
          </a>
          <a href="#" className="underline">
            Contact us
          </a>
          <a href="#" className="underline">
            Buying policy
          </a>
        </div>
        <hr className="my-3" />
        <div className="flex gap-5 mb-4">
          <a href="#">Privacy policy</a>
          <a href="#">Terms of use</a>
        </div>
        <div className="flex justify-between">
          <p>© Smallsmall Technology 2025</p>
          <a href="https://smallsmall.com" className="underline">
            Smallsmall.com
          </a>
        </div>
      </footer>
    </>
  );
};
