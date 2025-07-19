export const CreditScoreCard = ({ score = 200, maxScore = 750 }) => {
  const clampedScore = Math.max(0, Math.min(score, maxScore));
  const percentage = (clampedScore / maxScore) * 100;

  return (
    <div className="w-full lg:w-[190px] px-6 py-3 bg-white rounded-2xl shadow-credit-card ">
      <div className="text-[43px] font-semibold text-black">{clampedScore}</div>
      <div className="text-sm font-normal  mb-4">Credit score</div>

      <div className="relative w-full h-4 bg-gray-100 rounded-[3px] overflow-hidden">
        <div
          className="h-full rounded-[3px]"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(to right, #6FCEF5, #F2F2F2)',
          }}
        />
      </div>

      <div className="flex justify-between text-[9px] font-normal text-[#CDCBCC] mt-1">
        <span>0</span>
        <span>{maxScore}</span>
      </div>
    </div>
  );
};
