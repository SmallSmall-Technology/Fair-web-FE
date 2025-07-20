import { Link } from 'react-router-dom';
import { Button } from '../../../utils/Button';
import LinkButton from '../../../utils/LinkButton';
import FooterNav from './FooterNav';
import { menuFooter } from '../../../utils/data';
import React from 'react';
import { Copyright } from 'lucide-react';
import Logo from '../Logo';
import FooterContactInfo from './FooterTop';

const Footer = () => {
  return (
    <div className=" p-6  md:p-12 bg-[#f5f5f5] ">
      <FooterContactInfo />
      <div className=" md:flex justify-stretch mb-20 border-t pt-7">
        {/* footer logo */}
        <div className=" mb-10 ">
          <div className="footer-logo mb-8">
            {/* <img src="/images/smallsmall-logo.svg" alt="Smallsmall Logo" /> */}
            <Logo />
            <p className="mt-4">Shop today, pay later</p>
          </div>
          {/* <div>
            <LinkButton link="#" className="bg-[#FFDE11;] px-4 py-3 text-black">
              Join or login
            </LinkButton>
          </div> */}
        </div>
        {/* footer navigation */}
        <div className="flex grow justify-around">
          <FooterNav menuFooter={menuFooter} />
        </div>
        {/* footer social link */}
        <div className="mb-8">
          {/* social media */}
          <div className="mb-10">
            <p className="mb-4">Find us on</p>
            <div className="flex">
              <Link to="" className="mr-4">
                <img src="/images/Facebook.svg" alt="Small small facebook" />
              </Link>
              <Link to="" className="mr-4">
                <img src="/images/Instagram.svg" alt="Small small Instagram" />
              </Link>
              <Link to="" className="mr-4">
                <img src="/images/x-logo.svg" alt="Small small Twitter" />
              </Link>
              <Link to="" className="mr-4">
                <img src="/images/LinkedIn.svg" alt="Small small Linkedin" />
              </Link>
              <Link to="" className="mr-4">
                <img src="/images/YouTube.svg" alt="Small small YouTube" />
              </Link>
              <Link to="" className="mr-4">
                <img src="/images/Whatsapp.svg" alt="Small small Whatsapp" />
              </Link>
            </div>
          </div>
          {/* fair apps */}
          <div className="">
            <p className="mb-4">Backed by</p>
            <div className="flex gap-2">
              <img src="/images/techstars-logo.svg" alt="" />
              <img src="/images/oyester-logo.svg" alt="" />
              <img src="/images/resilience-logo.svg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className=" border-t pt-7">
        <div className="flex align-middle text-xs">
          {/* <span className="pt-1 mr-2">
            <Copyright />
          </span> */}
          <div className="flex">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height=""
                viewBox="0 0 10 10"
                fill="none"
              >
                <g clip-path="url(#clip0_7005_141)">
                  <path
                    d="M5 10C4.0111 10 3.0444 9.70676 2.22215 9.15735C1.39991 8.60794 0.759043 7.82705 0.380605 6.91342C0.00216643 5.99979 -0.0968503 4.99446 0.0960758 4.02455C0.289002 3.05465 0.765206 2.16373 1.46447 1.46447C2.16373 0.765206 3.05465 0.289002 4.02455 0.0960758C4.99446 -0.0968503 5.99979 0.00216643 6.91342 0.380605C7.82705 0.759043 8.60794 1.39991 9.15735 2.22215C9.70676 3.0444 10 4.0111 10 5C9.99857 6.32564 9.47132 7.59658 8.53395 8.53395C7.59658 9.47132 6.32564 9.99857 5 10ZM5 1.25C4.25832 1.25 3.5333 1.46994 2.91661 1.88199C2.29993 2.29405 1.81928 2.87972 1.53545 3.56494C1.25163 4.25016 1.17736 5.00416 1.32206 5.73159C1.46675 6.45902 1.8239 7.12721 2.34835 7.65165C2.8728 8.1761 3.54099 8.53325 4.26841 8.67795C4.99584 8.82264 5.74984 8.74838 6.43507 8.46455C7.12029 8.18072 7.70596 7.70008 8.11801 7.08339C8.53007 6.46671 8.75 5.74168 8.75 5C8.74879 4.00581 8.35331 3.05269 7.65031 2.34969C6.94732 1.64669 5.99419 1.25122 5 1.25Z"
                    fill="#222224"
                  />
                  <path
                    d="M4.97149 7.82048C4.50752 7.82045 4.05072 7.706 3.64154 7.48726C3.23237 7.26852 2.88346 6.95224 2.62573 6.56644C2.36799 6.18064 2.20938 5.73723 2.16395 5.27549C2.11852 4.81374 2.18767 4.34792 2.36527 3.91929C2.54287 3.49066 2.82344 3.11244 3.18214 2.81815C3.54083 2.52385 3.96657 2.32256 4.42164 2.23211C4.8767 2.14166 5.34706 2.16484 5.79103 2.29959C6.235 2.43434 6.63889 2.67651 6.96691 3.00465L6.08274 3.88881C5.86295 3.66899 5.58291 3.51928 5.27803 3.45861C4.97315 3.39795 4.65712 3.42906 4.36992 3.54801C4.08273 3.66696 3.83725 3.8684 3.66454 4.12687C3.49184 4.38533 3.39965 4.68921 3.39965 5.00006C3.39965 5.31092 3.49184 5.61479 3.66454 5.87326C3.83725 6.13172 4.08273 6.33317 4.36992 6.45212C4.65712 6.57106 4.97315 6.60217 5.27803 6.54151C5.58291 6.48085 5.86295 6.33114 6.08274 6.11131L6.96649 6.99548C6.70466 7.25758 6.39363 7.46538 6.05127 7.60696C5.70892 7.74853 5.34197 7.82109 4.97149 7.82048Z"
                    fill="#222224"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7005_141">
                    <rect width="10" height="10" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <p className="pt-1">
              <span className="mr-4 ">Smallsmall Technology 2025</span>
            </p>
          </div>
          <Link to="" className="mr-4 pt-1">
            Smallsmall.com
          </Link>
          <Link to="/terms-of-use" className="mr-4 pt-1">
            Terms of use
          </Link>
          <Link to="" className="mr-4 pt-1">
            Privacy policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Footer);
