import { useSelector } from 'react-redux';

export const VerificationSuccessCard = ({ title, icon, type }) => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <article className="font-inter w-full md:w-[521px] h-[184px] bg-[#F5F5F7] p-4 px-8 rounded-[6px] flex flex-col justify-between">
      {type === 'id' && (
        <>
          <div className="flex items-center">
            <div className="w-[15px] h-[15px] mr-1">
              <img src={icon} alt={title} className="w-full h-full" />
            </div>
            <p className="font-semibold text-base">ID Verification</p>
          </div>
          <p className="mt-2">{user?.name || 'AYOMIDE FATADE TAOPHEEQ'}</p>
          <p className="font-normal">
            ID Type:{' '}
            <span className="font-semibold">
              {user?.idType || 'Drivers License'}
            </span>
          </p>
          <div className="text-sm font-semibold flex items-center space-x-2">
            <img
              src="/images/check 1.svg"
              alt="Check Icon"
              className="w-[15px] h-[15px]"
            />
            <p>ID Verified</p>
          </div>
        </>
      )}

      {type === 'debt' && (
        <>
          <div className="flex items-center">
            <img src={icon} alt={title} className="w-10 h-10 mr-2" />
            <p className="font-semibold text-base">Debt Profile Verification</p>
          </div>
          <p className="font-semibold text-lg">No outstanding debt</p>
          <div className="text-sm font-semibold flex items-center space-x-2">
            <img
              src="/images/check 1.svg"
              alt="Check Icon"
              className="w-[15px] h-[15px]"
            />
            <p>Debt Profile Verified</p>
          </div>
        </>
      )}

      {type === 'address' && (
        <>
          <div className="flex items-center">
            <img src={icon} alt={title} className="w-10 h-10 mr-2" />
            <p className="font-semibold text-base">Address Verification</p>
          </div>
          <p className="font-semibold text-lg">
            {user?.residentialAddress || '123 Main St, Anytown, USA'}
          </p>
          <div className="text-sm font-semibold flex items-center space-x-2">
            <img
              src="/images/check 1.svg"
              alt="Check Icon"
              className="w-[15px] h-[15px]"
            />
            <p>Debt Profile Verified</p>
          </div>
        </>
      )}
    </article>
  );
};
