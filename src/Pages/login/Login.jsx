import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, clearError } from '../../features/auth/authSlice';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';

      toast.dismiss();
      toast.success('Login successful!', {
        autoClose: 3000,
        className:
          'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    if (error) {
      setFormData((prev) => ({ ...prev, password: '' }));
    }
  }, [error]);

  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.dismiss();
      toast.error('Please fill in all fields', {
        autoClose: 3000,
        className:
          'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
      return;
    }
    try {
      await dispatch(login(formData)).unwrap();
    } catch (err) {
      toast.dismiss();
      toast.error('Please fill in all fields', {
        autoClose: 3000,
        className:
          'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:block bg-[#FFDE11] w-full md:w-1/3 p-8 lg:flex flex-col py-8">
        <div className="space-y-4">
          <p className=" text-4xl font-normal">Your needs can’t wait</p>
          <p className=" text-5xl font-normal">Meet them on</p>
          <p className=" text-7xl font-bold">Fair</p>
        </div>
        <div className="mt-8 h-[357px] w-[355px]">
          <img src="/images/login-img.svg" alt="" className="w-full h-full" />
        </div>
      </div>

      <div className="flex-1 py-6 px-5 flex flex-col items-start lg:w-2/3 lg:pl-36 ">
        <div className="w-full ">
          <div className="mb-10 lg:mb-5 text-center w-full flex lg:justify-end lg:pr-8">
            <img
              src="/images/fair-logo.svg"
              alt="Fair Logo"
              className="mx-auto md:mx-0"
            />
          </div>

          <div className=" mb-8 text-center">
            <h1 className="text-3xl font-semibold mb-3 lg:text-start">Login</h1>
            <p className="text-sm text-gray-500 hidden lg:flex">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
            <p className="text-sm text-gray-500 md:hidden">
              New to Fair?{' '}
              <Link to="/sign-up" className="text-blue-600">
                Create account
              </Link>
            </p>
          </div>

          <LoginForm />

          <div className="text-center mt-4 max-w-md">
            <p className="text-xs text-gray-600">
              By clicking login, you agree to our
            </p>
            <p className="text-xs">
              <Link to="#" className="text-red-600">
                Terms of use
              </Link>{' '}
              and{' '}
              <Link to="#" className="text-red-600">
                privacy policy
              </Link>
            </p>
          </div>

          <div className="hidden lg:block">
            <div className="my-4 max-w-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="2"
                viewBox="0 0 480 2"
                fill="none"
              >
                <path d="M0 1H480" stroke="#ECEDF1" />
              </svg>
            </div>

            <div className="text-center grid gap-5 max-w-md">
              <p className="text-sm">New to Fair?</p>
              <Link
                to="/sign-up"
                className="bg-[#FFF8CF] rounded-full border-[#FFDE11] w-full px-8 py-3 text-lg font-medium text-black hover:bg-[#FFDE11] hover:text-black"
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="mt-8 grid justify-items-center lg:hidden">
            <img
              src="/images/login-img.svg"
              alt=""
              className="h-[144px] w-[145px] mb-10"
            />
            <p className=" text-lg font-normal">Your needs can’t wait</p>
            <p className=" text-3xl font-normal">Meet them on</p>
            <p className=" text-3xl font-bold">Fair</p>
          </div>

          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
