import { styled } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import LinkButton from '../../utils/LinkButton';

const StyledImage = styled.img`
  position: absolute;
  top: 73px;
  left: -237px;
`;

const Heading = styled.h1`
  color: #222224;
  font-family: Outfit;
  font-size: 56px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const HeadingMobile = styled.h1`
  color: #222224;
  font-family: Outfit;
  font-size: 38px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  line-height: 47px;
`;

function HeroSection() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <section className="hero md:bg-gradient-to-b from-slate-50 via-gray-[#FFFBE5] to-yellow-100 md:pt-10 md:px-20">
      {/* Hero section */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full p-4 md:p-0  md:w-2/5 order-last md:order-first my-4 text-center md:text-left ">
          {isMobile ? (
            <HeadingMobile>
              Get your needs because they can't wait
            </HeadingMobile>
          ) : (
            <Heading className="">
              Get your needs <br />
              because they can't <br /> wait
            </Heading>
          )}

          <p className="my-4">
            Get what you need today with SmallSmall's flexible payments. Pay a
            fraction now, enjoy now, and settle the rest stress-free.
          </p>

          <LinkButton className="bg-[#FFDE11] px-5 py-3 my-5 w-auto rounded-full">
            Get started with Smallsmall
          </LinkButton>
        </div>
        <div className="w-full md:w-3/5 flex justify-end ">
          <div className="relative">
            <img src="/images/woman-bag.svg" alt="" className="relative" />
            <StyledImage
              src="/images/different-products.svg"
              alt=""
              style={isMobile ? { width: '50%', top: '107px', left: '0' } : {}}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
