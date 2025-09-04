import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logo from '../../images/logo-recipes-app.svg';
import { loginFormSchema, LoginFormSchema } from '../../schemas/auth-schema';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = (data: LoginFormSchema) => {
    localStorage.setItem('user', JSON.stringify({ email: data.email }));
    navigate('/meals');
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center min-vh-100 p-0"
      style={ { backgroundColor: '#4B0082' } }
    >

      <Row className="w-100 justify-content-center mt-5">
        <Col xs={ 10 } className="text-center">
          <img
            src={ logo }
            alt="logo do site"
            className="img-fluid mb-5"
            style={ { maxHeight: '200px' } }
          />
        </Col>
      </Row>

      <Row
        className="w-100 justify-content-center bg-white rounded-top-5 shadow-lg pt-5
          pb-4 mt-auto"
      >
        <Col xs={ 10 } sm={ 8 } md={ 6 } lg={ 4 }>
          <h2
            className="text-center fw-bold mb-4"
            style={ { color: '#4B0082', letterSpacing: '3px' } }
          >
            LOGIN
          </h2>

          <Form noValidate onSubmit={ handleSubmit(onSubmit) }>

            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                data-testid="email-input"
                isInvalid={ !!errors.email }
                { ...register('email') }
                className="rounded-3 border-2"
                style={ { borderColor: '#4B0082' } }
              />
              <Form.Control.Feedback type="invalid">
                {errors?.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                data-testid="password-input"
                isInvalid={ !!errors.password }
                { ...register('password') }
                className="rounded-3 border-2"
                style={ { borderColor: '#4B0082' } }
              />
              <Form.Control.Feedback type="invalid">
                {errors?.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button
                type="submit"
                data-testid="login-submit-btn"
                disabled={ !isValid }
                className="rounded-3 py-2 fw-bold text-uppercase"
                style={ {
                  backgroundColor: '#FBC02D',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.1rem',
                  letterSpacing: '1px',
                } }
              >
                Enter
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export { Login };
