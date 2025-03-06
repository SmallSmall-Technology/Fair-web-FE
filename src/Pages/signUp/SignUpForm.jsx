import Form from "react-bootstrap/Form";

import { Button } from "../../utils/Button";

function SignUpForm() {
  return (
    <Form className="my-3">
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="text" placeholder="Phone number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button className=" text-center overflow-hidden  bg-[#FFDE11]  rounded-full border-[#FFDE11] w-full  md:px-12 md:py-3 py-[10px] text-lg font-medium text-black hover:bg-gray-100 hover:text-black">
        Create account
      </Button>
    </Form>
  );
}

export default SignUpForm;
