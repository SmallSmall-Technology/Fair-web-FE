import clsx from 'clsx';
import { formatCurrency } from '../../../../../../../utils/FormatCurrency';

export const PaymentHistory = ({ payments }) => (
  <>
    <div className="relative flex flex-col items-start md:flex md:flex-row md:justify-between md:items-center mt-4">
      {payments.map((step, index) => {
        const paymentDuration = 3;

        return (
          <div
            key={index}
            className="relative inline-flex gap-3 md:grid flex-row-reverse lg:flex-1 text-start"
          >
            <div className="grid gap-1 mb-8 md:mb-3">
              <p className="font-medium mb- lg:mb-0">{step.date}</p>
              <div className="text-xs flex gap-1 justify-start">
                <p>{formatCurrency(step?.amount)}</p>

                <div className="flex items-center gap-1">
                  <p>
                    - {index + 1} of {paymentDuration}
                  </p>
                  <span>paid</span>
                  <img
                    src="/images/check 1.svg"
                    alt="done"
                    className="w-[15px] h-[15px]"
                  />
                </div>
              </div>
            </div>

            <div className="md:grid items-start md:items-center md:mt-2 relative ">
              <div
                className={clsx(
                  'w-[10px] h-[10px] rounded-full md:absolute md:inline-flex bg-black'
                )}
              ></div>
              <>
                <div className="md:hidden absolute left-[40%] w-[2px] h-full bg-black z-0"></div>
                <div className="hidden md:flex left-1/2 md:right-[-50] md:w-full h-full md:h-[2px] bg-black z-0"></div>
              </>
            </div>
          </div>
        );
      })}
    </div>
    <div className="mt-8 flex items-center">
      <img src="/images/truck.svg" alt="icon" />
      <p className="text-[11px] pl-1">
        Item delivered on{' '}
        <span className="font-semibold">12 December 2024</span>
      </p>
    </div>
  </>
);
