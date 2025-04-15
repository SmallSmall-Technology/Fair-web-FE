import { Link } from 'react-router-dom';
import { Button } from '../../../utils/Button';
import LinkButton from '../../../utils/LinkButton';
import { FaRegCopyright } from 'react-icons/fa6';
import FooterNav from './FooterNav';
import { menuFooter } from '../../../utils/data';

const Footer = () => {
  return (
    <div className=" p-6  md:p-12 bg-[#222224] text-white">
      <div className=" md:flex justify-stretch mb-20 ">
        {/* footer logo */}
        <div className=" mb-10 ">
          <div className="footer-logo mb-8">
            <img src="/images/fair-logo-white.svg" alt="fair logo" />
            <p className="mt-4">Shop today, pay later</p>
          </div>
          <div>
            <LinkButton link="#" className="bg-[#FFDE11;] px-4 py-3 text-black">
              Join or login
            </LinkButton>
          </div>
        </div>
        {/* footer navigation */}
        <div className="flex grow justify-around">
          <FooterNav menuFooter={menuFooter} />
        </div>
        {/* footer social link */}
        <div className=" self-end mb-8">
          {/* social media */}
          <div className="mb-10">
            <p className="mb-4">Find us on</p>
            <div className="flex">
              <Link to="" className="mr-4">
                <img src="/images/Facebook.svg" alt="" />
              </Link>
              <Link to="" className="mr-4">
                <img src="/images/Instagram.svg" alt="" />
              </Link>
              <Link to="" className="mr-4">
                <img src="/images/x-logo.svg" alt="" />
              </Link>
              <Link to="" className="mr-4">
                <img src="/images/LinkedIn.svg" alt="" />
              </Link>
              <Link to="" className="mr-4">
                <img src="/images/YouTube.svg" alt="" />
              </Link>
              <Link to="" className="mr-4">
                <img src="/images/Whatsapp.svg" alt="" />
              </Link>
            </div>
          </div>
          {/* fair apps */}
          <div className="">
            <p className="mb-4">Get the app</p>
            <div className=" flex ">
              <Link className="mr-2">
                <img src="/images/play-store.svg" alt="play store logo" />
              </Link>
              <Link>
                <img src="/images/app-store.svg" alt="app store logo" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className=" border-t pt-7">
        <div className="flex align-middle text-xs">
          <span className="pt-1 mr-2">
            <FaRegCopyright />
          </span>
          <p className="pt-1">
            <span className="mr-4 ">Fair by Smallsmall Technology 2025</span>{' '}
            <span>fairapp.ng</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
