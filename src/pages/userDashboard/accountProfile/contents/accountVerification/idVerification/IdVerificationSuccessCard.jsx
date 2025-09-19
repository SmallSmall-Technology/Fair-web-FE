export const IdVerificationSuccessCard = ({
  icon,
  title,
  data,
  addressData,
}) => {
  const user = {
    name: 'Ayomide Fatade Taopheeq',
    idType: 'Drivers License',
  };
  return (
    <>
      <article className="font-inter w-full md:w-[521px] h-[184px] bg-[#F5F5F7] p-4 px-8 rounded-[6px] flex flex-col justify-between">
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
      </article>
    </>
  );
};
