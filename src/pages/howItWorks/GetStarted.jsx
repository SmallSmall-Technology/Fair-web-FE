import LinkButton from '../../utils/LinkButton';

function GetStarted() {
  return (
    <div className=" my-5 text-center ">
      <div className="flex justify-center  p-4">
        <img
          className="max-w-full h-auto my-10"
          src="/images/get-started.svg"
          alt="get started"
        />
      </div>
      <LinkButton
        link="/sign-up"
        className="bg-[#FFDE11] font-bold text-xl px-10 py-3 my-5 inline rounded-full"
      >
        Sign up
      </LinkButton>
    </div>
  );
}

export default GetStarted;
