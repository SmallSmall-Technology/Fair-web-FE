import { useSelector } from 'react-redux';
import { Button } from '../../utils/Button';
import { getUserIsAuthenticated } from '../../features/auth/authSlice';

export const HeroTextSection = () => {
  const isAuthenticated = useSelector(getUserIsAuthenticated);
  return (
    <div className="font-medium text-[23px] mt-5 mb-8 g grid gap-3 lg:flex lg:space-x-3 items-center lg:mx-4">
      <p className="font-outfit text-medium">
        Shop and pay in instalments for everything you need.
      </p>
      {!isAuthenticated && (
        <div className="flex space-x-3">
          <Button
            className="font-outfit bg-[var(--yellow-primary)] rounded-[20px] border px-3 py-1 text-black font-medium 
               hover:bg-white hover:border-[#222224] focus-visible:outline focus-visible:outline-2 
               focus-visible:outline-offset-2 focus-visible:outline-yellow-500 
               transition"
          >
            Sign up
          </Button>

          <Button
            className="font-outfit border border-[#222224] rounded-[20px] px-3 py-1 text-black font-medium 
               hover:bg-[var(--yellow-primary)] hover:border-white
               focus-visible:outline focus-visible:outline-2 
               focus-visible:outline-offset-2 focus-visible:outline-[#222224] 
               transition"
          >
            Learn more
          </Button>
        </div>
      )}
    </div>
  );
};
