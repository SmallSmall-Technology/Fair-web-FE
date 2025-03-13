import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useEffect } from "react";
import SignUpForm from "./SignUpForm";
import { Link } from "react-router";
import LinkButton from "../../utils/LinkButton";
import { styled } from "styled-components";

const Heading = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;
const HeadingText = styled.p`
  color: #222224;
  font-size: 14px;
  font-weight: 400;
`;

function SignUp() {
  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
  }, []);

  return (
    <Container fluid>
      <Row className="p-0">
        <Col md={4} className=" d-none d-md-block p-0">
          <div>
            <Image src="/images/sign-up-bg.png" className="h-100" fluid />
          </div>
        </Col>
        <Col md={8} className=" py-3 px-5">
          {/* logo header */}
          <div className="d-flex md:justify-end justify-between mb-5">
            <div className="md:self-end">
              <img src="/images/fair-logo.svg" alt="Fair Logo" />
            </div>
            <div className="d-block d-md-none">
              <Link className="text-dark" to="/login">
                Log in
              </Link>
            </div>
          </div>
          <Row className="justify-content-center">
            <Col md={7}>
              <Row>
                <Col md={12} className="text-center text-md-start">
                  <Heading>Create your free account</Heading>
                  <HeadingText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</HeadingText>
                </Col>
                <Col md={12}>
                  <SignUpForm />
                  <div className="text-center">
                    <p className="text-sm m-0">By clicking Create account, you agree to our</p>
                    <p className="text-sm ">
                      {" "}
                      <Link to="#" className="text-danger text-decoration-none">
                        Terms of use
                      </Link>{" "}
                      and{" "}
                      <Link to="#" className="text-danger text-decoration-none">
                        privacy policy
                      </Link>{" "}
                    </p>
                  </div>
                  <div className="my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="2" viewBox="0 0 480 2" fill="none">
                      <path d="M0 1H480" stroke="#ECEDF1" />
                    </svg>
                  </div>

                  <div className="text-center d-none d-md-block">
                    <p>Already have an account?</p>
                    <LinkButton
                      link="/login"
                      className="bg-[#FFF8CF] text-center rounded-full border-[#FFDE11] w-full   md:px-12 py-3 text-lg font-medium text-black hover:bg-[#FFDE11] hover:text-black"
                    >
                      Log in
                    </LinkButton>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
