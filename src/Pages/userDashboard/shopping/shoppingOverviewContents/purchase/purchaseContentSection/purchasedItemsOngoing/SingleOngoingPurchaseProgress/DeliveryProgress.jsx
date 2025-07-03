import clsx from 'clsx';

export const DeliveryProgress = ({ deliveries }) => (
  <div className="relative flex flex-col items-start md:flex md:flex-row md:justify-between md:items-center mt-4 px-8">
    {deliveries.map((step, index) => {
      const isDone = step.status == 'done';
      const nextIsDone = deliveries[index + 1]?.status !== 'pending';

      return (
        <div
          key={index}
          className="relative inline-flex gap-3 md:grid flex-row-reverse flex-1 justify-star text-start"
        >
          <div className="grid grid-cols-1 gap-1">
            <div className=" flex gap-1 justify-start">
              <p className="font-medium">{step.label}</p>
            </div>
            <div
              className={`text-xs flex items-center mb-6 md:mb-0 gap-1 ${!isDone ? 'text-[#A3A3A2]' : ''}`}
            >
              <p>{step.text}</p>
              {isDone && (
                <div className="flex items-center gap-1">
                  <span>done</span>
                  <img
                    src="/images/check 1.svg"
                    alt="done"
                    className="w-[15px] h-[15px]"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid items-start md:items-center md:mt-2 relative ">
            <div
              className={clsx(
                'w-[10px] h-[10px] rounded-full md:absolute md:inline-flex',
                {
                  'bg-black': isDone,
                  'bg-yellow-400 border-2 border-[#F6F6F6] outline outline-2 outline-[#E8EBEA] outline-offset-2 mt-1 md:mt-0 md:ml-1':
                    step.status === 'current',
                  'bg-red-500': step.status === 'failed',
                  'bg-gray-300': step.status === 'pending',
                }
              )}
            ></div>
            {isDone && nextIsDone && (
              <>
                <div className="md:hidden absolute left-[40%] w-[2px] h-full bg-black z-0"></div>
                <div className="hidden md:flex left-1/2 md:right-[-50] md:w-full h-full md:h-[2px] bg-black z-0"></div>
              </>
            )}
          </div>
        </div>
      );
    })}
  </div>
);
