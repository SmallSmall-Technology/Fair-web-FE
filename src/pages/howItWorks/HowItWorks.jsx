import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import HorizontalScrollBar from './HorizontalScrollBar';
import ScrollableCards from './ScrollableCards';
import ContentSection from './ContentSection';
import Accordion from './Accordion';

const items = [
  { name: 'What is Smallsmall?', link: '/what-is-smallsmall' },
  { name: 'How it works', link: '/how-it-works' },
  { name: 'Get started', link: '/get-started' },
  { name: 'FAQs', link: '/faqs' },
];

const benefitsData = [
  {
    title: 'Flexible Payments.',
    description:
      'Choose your plan: 35% or 50% down, spread the rest over 3-6 months. No hidden fees, ever.',
  },
  {
    title: 'Shop with Confidence.',
    description:
      '1,000+ quality vetted products - from gadgets to homes and  essentials. All at fair prices.',
  },
  {
    title: 'Budget friendly.',
    description:
      "Our AI tool helps you plan payments that won't break your monthly flow. ",
  },
  {
    title: 'Instant Approval',
    description:
      'Get approved in minutes, not days. Shop today, pay small small tomorrow.',
  },
];

function HowItWorks() {
  return (
    <>
      <HeroSection />
      <HorizontalScrollBar items={items} />
      <ContentSection
        title="Shop with confidence, live with flexibility"
        description="Smallsmall is the way we believe shopping should be. With our flexible instalment payment options, you can shop with confidence, knowing you have an affordable way to pay for your purchases."
      >
        <p>What is Smallsmall?</p>
      </ContentSection>
      <ScrollableCards cards={benefitsData} />
      <ContentSection
        title="How Smallsmall works"
        description="Smallsmall makes it easy to own what you love without straining your budget. Simply choose your favorite item, select a flexible payment plan, and enjoy it right away while paying over time."
      />

      <ContentSection
        title="Get Started with SmallSmall"
        description="Own what you love, your way. Sign up in minutes and start shopping with flexible payment options tailored to your budget."
      />
      <Accordion>
        <div className="flex justify-between my-10 align-bottom ">
          <h2 className="text-[35px]">
            Still have more questions about Smallsmall?
          </h2>
          <Link to="/" className="text-sm">
            See all FAQ
          </Link>
        </div>
      </Accordion>
    </>
  );
}

export default HowItWorks;
