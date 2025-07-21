 ';

const DashboardSummarySkeleton = () => {
  return (
    <section className="grid grid-cols-1 gap-6 animate-pulse">
      <article>
        <h1 className="font-semibold text-2xl mb-3 bg-gray-200 h-6 w-32 rounded" />
        <div className="border rounded-[10px] pt-4 pb-8 px-5 w-full">
          <ul className="flex space-x-8">
            {['Ongoing', 'Completed', 'Cancelled'].map((label, i) => (
              <li className="grid gap-2" key={i}>
                <p className="bg-gray-200 h-4 w-20 rounded" />
                <p className="flex items-center space-x-1">
                  <span className="w-6 h-6 bg-gray-300 rounded-full" />
                  <span className="font-semibold bg-gray-300 h-8 w-10 rounded" />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </article>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[38%_60%]">
        <div className="border p-4 rounded-[10px] h-48 bg-gray-200" />

        <div>
          <div className="flex justify-between items-baseline">
            <h1 className="font-semibold text-2xl mb-4 bg-gray-200 h-6 w-40 rounded" />
            <div className="bg-gray-200 h-4 w-16 rounded" />
          </div>

          <section className="grid grid-cols-1 gap-4 border w-full rounded-[10px] p-2">
            {[1, 2].map((_, i) => (
              <div key={i} className="bg-gray-200 h-20 w-full rounded" />
            ))}
          </section>
        </div>
      </div>
    </section>
  );
};

export default DashboardSummarySkeleton;
