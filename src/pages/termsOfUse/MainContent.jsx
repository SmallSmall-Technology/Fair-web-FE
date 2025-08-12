import { Link } from 'react-router-dom';
import { termsSections } from '../../utils/termsData';
import { styled } from 'styled-components';

const Heading = styled.h1`
  color: #222224;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const StyledLink = styled.a`
  color: #222224;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
`;

function MainContent() {
  return (
    <div className="md:col-span-3">
      <div className="py-3 ">
        <Heading>Terms of use</Heading>
      </div>

      <p className="my-4">Last Updated: July 7th, 2025</p>
      <div className="mb-10">
        <ol>
          {termsSections.map((term, i) => (
            <li key={i}>
              <span>{i + 1}.</span>
              <StyledLink
                className="mx-2 text-blue-600 underline"
                href={`#${term.id}`}
              >
                {term.title}
              </StyledLink>
            </li>
          ))}
        </ol>
      </div>

      <div>
        {termsSections.map((section, i) => (
          <Section
            key={section.id}
            id={section.id}
            title={`${i + 1} ${section.title}`}
          >
            {section.content}
          </Section>
        ))}
      </div>
    </div>
  );
}

const Section = ({ id, title, children }) => (
  <section className="my-10" id={id}>
    <h2 className="text-xl font-bold scroll-mt-24">{title}</h2>
    <div className="mt-2 text-gray-700 text-sm">{children}</div>
  </section>
);

export default MainContent;
