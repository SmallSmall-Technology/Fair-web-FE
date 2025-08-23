import { useForm } from 'react-hook-form';

export const CartCoupon = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      coupon: '',
    },
  });

  const onSubmit = (data) => {
    // Handle coupon submission logic here (e.g., API call)
    reset();
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2 lg:w-[70%] font-inter">
          <label htmlFor="coupon" className="flex items-center">
            <span>
              <img src="../../../images/label.svg" alt="label logo" />
            </span>
            Apply a coupon code
          </label>
          <div className="relative">
            <input
              type="text"
              id="coupon"
              {...register('coupon')}
              placeholder="Enter code"
              className="border border-[#737376] w-full rounded-md py-2 px-4"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? 'Applying...' : 'Apply'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
