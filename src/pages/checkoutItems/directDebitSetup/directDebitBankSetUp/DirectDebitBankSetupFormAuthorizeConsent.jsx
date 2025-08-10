/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom';
import { PaymentFooter } from '../PaymentFooter';
import { CustomButton } from '../../../../utils/Button';
import { Minus, MoveDown, MoveRight } from 'lucide-react';
import { SendMoneyCard } from '../../../../ui/components/SendMoneyCard';

export const DirectDebitBankSetupFormAuthorizeConsent = () => {
  const user = {
    bankName: 'STANDARD CHARTERED BANK',
    accountNumber: '1234567890',
  };

  const mono = {
    bankName: 'WEMA BANK',
    accountNumber: '0987654321',
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/cart-items/checkout/mandate/create-success');
  };

  return (
    <section className="max-w-6xl mx-auto grid gap-10 pt-10 px-4 lg:px-6 ">
      <div>
        <div className="flex items-center justify-start mb-8 lg:mb-4 lg:justify-end ">
          <div className="flex items-center gap-1">
            <span className="font-medium text-[11px] text-white bg-black px-1 lg:px-2 py-[3px] rounded-[1px]">
              1
            </span>
            <p className="flex items-center text-xs whitespace-nowrap">
              Bank Account{' '}
              <span>
                <Minus />
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1">
            <span className="font-medium text-[11px] text-white bg-black px-1 lg:px-2 py-[3px] rounded-[1px]">
              2
            </span>
            <p className="flex items-center text-xs whitespace-nowrap">
              Authorize consent
              <span>
                <Minus />
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1 opacity-25">
            <span className="font-medium text-[11px] text-white bg-black px-1 lg:px-2 py-[3px] rounded-[1px]">
              3
            </span>
            <p className="text-xs whitespace-nowrap">Setup Complete</p>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 lg:mb-2">Direct debit setup</h2>
        <p className="text-sm font-medium mb-4 max-w-[804px] text-balance">
          A transfer of N50 serves as your formal consent to authorize and link
          direct debit for this order to your bank account, enabling seamless
          recurring payments.
        </p>
        <div className="flex items-center">
          <span className="mr-2 font-medium text-[11px] text-white bg-black p-2 py-[4px]">
            2
          </span>
          <p className="text-sm font-medium ">Authorize consent</p>
        </div>
      </div>

      <div className="w-full lg:max-w-[855px] ">
        <div className="grid gap-3 lg:flex items-center space-y-8 lg:space-y-0 lg:justify-between ">
          <SendMoneyCard
            action="Send from"
            bankName={user?.bankName}
            accountNumber={user?.accountNumber}
            amount={'₦50'}
          />
          <MoveRight className="hidden lg:flex" size={70} />
          <MoveDown className=" lg:hidden w-full" size={40} />

          <SendMoneyCard
            action="Send to"
            bankName={mono?.bankName}
            monoAccountNumber={mono?.accountNumber}
          />
        </div>
        <div className=" flex flex-col  lg:w-[377px] lg:ml-auto ">
          <p className="lg:pr-5 pt-2 pb-4 text-center">
            This wema bank account expires in 23:50 secs
          </p>
          <CustomButton
            text="I have sent the money"
            bgColor="var(--yellow-primary)"
            hoverColor="var(--btn-hover-bg-primary)"
            width="lg:w-[400px]"
            fontWeight="font-medium"
            textSize="text-sm"
            onClick={handleSubmit}
          />
        </div>
      </div>
      <PaymentFooter />
    </section>
  );
};
