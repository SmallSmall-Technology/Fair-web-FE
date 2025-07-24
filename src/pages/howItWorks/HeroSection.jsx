import { styled } from 'styled-components';

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

function HeroSection() {
  return (
    <section className="hero bg-gradient-to-b from-slate-50 via-gray-[#FFFBE5] to-yellow-100 pt-10  px-20">
      {/* Hero section */}
      <div className="flex">
        <div className="w-[50%] ">
          <Heading>
            Get your needs <br />
            because they can't <br /> wait
          </Heading>
          <p>
            Get what you need today with SmallSmall's flexible payments. Pay a
            fraction now, enjoy now, and settle the rest stress-free.
          </p>
        </div>
        <div className="w-[50%] flex justify-end  ">
          <div className="relative">
            <img
              src="/public/images/woman-bag.svg"
              alt=""
              className="relative"
            />
            <StyledImage src="/public/images/different-products.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
