import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DirectDebitBankSetupForm } from './DirectDebitBankSetupForm';
import { DirectDebitBankSetupFormAuthorizeConsent } from './DirectDebitBankSetupFormAuthorizeConsent';

export const DirectDebitSetUp2 = () => {
  const [authorized, setAuthorized] = React.useState(false);
  // console.log(authorized);
  return (
    <>
      <header className=" border-b-2 text-center flex justify-between items-center w-full px-4 lg:px-32 py-5">
        <Link to="/" className="w-[128] lg:w-[149px]">
          <img
            src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
            alt="Smallsmall Logo"
            className="w-full"
          />
        </Link>
        <Link
          to="/cart-items/checkout"
          className="bg-[#ECEDF1]  px-3 md:px-5 py-2 rounded-[5px] text-sm font-medium flex items-center border"
        >
          <X color="#EF4237" />
          <span>Cancel Setup</span>
        </Link>
      </header>

      <section className="bg-[#FAFAFA]">
        {authorized === false ? (
          <DirectDebitBankSetupForm
            onAuthorized={authorized}
            setAuthorized={setAuthorized}
          />
        ) : (
          <DirectDebitBankSetupFormAuthorizeConsent />
        )}
      </section>
    </>
  );
};
