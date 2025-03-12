import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useEffect } from "react";
import LoginForm from "./LoginForm";
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

const CustomText = styled.div`
  p:nth-child(1) {
    color: #222224;
    font-size: 35px;
    font-weight: 400;
    line-height: 1.2em
  },
  
  p:nth-child(2) {
    color: #222224;
    font-size: 47px;
    font-weight: 400;
    line-height: 1.2em
  },
  p:nth-child(3) {
    color: #222224;
    font-size: 70px;
    font-weight: 700;
    letter-spacing: 2.1px;
    line-height: 1.2em
  },

`;

function Login() {
  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
  }, []);

  return (
    <Container fluid>
      <Row className="p-0">
        <Col md={4} className=" d-none d-md-block p-0 bg-[#FFDE11] vh-100 px-4 py-5">
          <Row className="flex-column justify-between">
            <Col className="mb-5">
              <CustomText>
                <p className="mb-0">Your needs can’t wait</p>
                <p className="mb-0">Meet them on</p>
                <p className="mb-0">Fair</p>
              </CustomText>
            </Col>
            <Col>
              <div>
                <Image src="/images/login-img.svg" alt="" role="decorative" />
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={8} className=" py-3 px-5">
          {/* logo header */}
          <div className="d-flex md:justify-end justify-center mb-5">
            <div className="">
              <img src="/images/fair-logo.svg" alt="Fair Logo" />
            </div>
          </div>
          <Row className="justify-content-center">
            <Col md={7}>
              <Row>
                <Col md={12} className="text-center text-md-start">
                  <Heading>Login</Heading>
                  <HeadingText className="d-none d-md-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit</HeadingText>
                  <HeadingText className="d-block d-md-none">
                    New to Fair?{" "}
                    <Link className="text-dark" to="/sign-up">
                      Create account
                    </Link>{" "}
                  </HeadingText>
                </Col>
                <Col md={12}>
                  <LoginForm />
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
                    <p>New to Fair?</p>
                    <LinkButton
                      link="/sign-up"
                      className="bg-[#FFF8CF] text-center rounded-full border-[#FFDE11] w-full   md:px-12 py-3 text-lg font-medium text-black hover:bg-[#FFDE11] hover:text-black"
                    >
                      Create account
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

export default Login;
