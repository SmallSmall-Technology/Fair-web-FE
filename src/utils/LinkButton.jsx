import { Link } from "react-router";
import { styled } from "styled-components";

const StyledLink = styled(Link)`
  border-radius: 20px;
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
