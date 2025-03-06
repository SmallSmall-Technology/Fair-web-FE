import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useEffect } from "react";

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
        <Col md={8} className=" py-8 px-12">
          {/* logo header */}
          <div className="d-flex justify-end">
            <div className="">
              <img src="/images/fair-logo.svg" alt="Fair Logo" />
            </div>
          </div>
          <div></div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
