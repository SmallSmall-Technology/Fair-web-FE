import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { Button } from '../../utils/Button';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, clearError } from '../../features/auth/authSlice';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Navigate on successful login
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';

      toast.dismiss();
      toast.success('Login successful!', {
        autoClose: 3000,
        className:
          'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Reset password on error
  useEffect(() => {
    if (error) {
      setFormData((prev) => ({ ...prev, password: '' }));
    }
  }, [error]);

  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.dismiss();
      toast.error('Please fill in all fields', {
        autoClose: 3000,
        className:
          'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
      return;
    }
    try {
      await dispatch(login(formData)).unwrap();
    } catch (err) {
      toast.dismiss();
      toast.error('Please fill in all fields', {
        autoClose: 3000,
        className:
          'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
    }
  };

  return (
    <Form className="my-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="e.g., admin@smallsmall.com"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="e.g., admin"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />
      </Form.Group>

      {error && <p className="text-danger mb-3">{error}</p>}

      <Button
        type="submit"
        className="text-center overflow-hidden bg-[#FFDE11] rounded-full border-[#FFDE11] w-full md:px-12 md:py-3 py-[10px] text-lg font-medium text-black hover:bg-gray-100 hover:text-black"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Log in'}
      </Button>

      <p className="mt-3 text-muted">
        For testing, use: <br />
        Email: admin@smallsmall.com <br />
        Password: admin
      </p>
    </Form>
  );
}

export default LoginForm;
