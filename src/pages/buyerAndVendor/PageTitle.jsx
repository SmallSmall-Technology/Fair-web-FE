import { styled } from 'styled-components';

const Heading = styled.h1`
  color: #222224;
  font-family: Outfit;
  font-size: 30px;
  font-weight: 600;
`;

function PageTitle({ title }) {
  return (
    <div className="my-6">
      <Heading>{title}</Heading>
    </div>
  );
}

export default PageTitle;
