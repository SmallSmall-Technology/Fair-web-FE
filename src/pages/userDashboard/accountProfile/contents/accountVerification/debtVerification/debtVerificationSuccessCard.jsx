import { useSelector } from 'react-redux';
import { selectVerificationData } from '../../../../../features/user/accountVerificationSlice';

export const DebtVerificationSuccessCard = ({ title, icon }) => {
  const data = useSelector((state) => selectVerificationData(state, 'debt'));

  return (
    <article className="font-inter w-full md:w-[521px] h-[184px] bg-[#F5F5F7] p-4 px-8 rounded-[6px] flex flex-col justify-between">
      <div className="flex items-center">
        <img src={icon} alt={title} className="w-10 h-10 mr-2" />
        <p className="font-semibold text-base">Debt Profile Verification</p>
      </div>

      {/* Optional: You can display API response details from `data` if you have them */}
      <p className="font-semibold text-lg">
        {data?.status === 'clear' ? 'No outstanding debt' : 'Verified'}
      </p>

      <div className="text-sm font-semibold flex items-center space-x-2">
        <img
          src="/images/check 1.svg"
          alt="Check Icon"
          className="w-[15px] h-[15px]"
        />
        <p>Debt Profile Verified</p>
      </div>
    </article>
  );
};
