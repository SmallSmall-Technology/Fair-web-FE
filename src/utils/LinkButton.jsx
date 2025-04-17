import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledLink = styled(Link)`
  // border-radius: 20px;
  text-decoration: none;
  width: 100%;
  display: inline-block;
  // background: #ffde11;
  font-size: 14px;
`;

function LinkButton({ children, link, className }) {
  return (
    <StyledLink to={link} className={className}>
      {children}
    </StyledLink>
  );
}

export default LinkButton;
