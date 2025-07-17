import { Button } from '../../../../utils/Button';
const RentOut = () => {
  return (
    <article className="bg-[var(--yellow-primary)] w-[90%] lg:w-[60%] mx-auto pt-6 pb-32 px-6 rounded-[10px] my-20">
      <h2 className="font-semibold text-2xl lg:text-4xl mb-4">
        Need to rent out your <br className="hidden lg:flex" /> property with no
        stress?
      </h2>
      <p className="font-medium text-xl lg:text-2xl mb-8">
        List with us and enjoy verified tenant
      </p>
      <Button className="bg-black rounded-lg text-white px-8 py-3">
        Sign up
      </Button>
    </article>
  );
};

export default RentOut;
