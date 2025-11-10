// src/pages/Login.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Image } from 'react-bootstrap';
import '../styles/login.scss';
import compnayLogo from '../assets/images/bc-kash-logo.png'; // Adjust the path as necessary
import CustomInput from '../components/custom-input/CustormInput';
import CustomButton from '../components/custom-button/custom-button';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import api from '../app/api';

export interface IReset {
  email: string;
}
const RequestResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const handleSubmit = async (payload:IReset) => {
    setLoading(true);
    // console.log({sending:payload});
    try {
      const res = await api.post('/staff/request-password-reset-otp',payload);
      navigate('/verify-password-reset-otp', { state: { email: payload.email } });
      setLoading(false);
    } catch (error) {
       setLoading(false);
    }
    // setError('');
    // try {
    //   // Simulated login API call
    //   if (email === 'testy@gmail.com' && password === 'password') {
    //     const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlZGVjMTRjLWI1MmUtNGMxOS1hM2QyLTgwMzRlNTgyNjU2YyIsIm5hbWUiOiIgICIsImVtYWlsIjoidGVzdHlAZ21haWwuY29tIiwicm9sZUlkIjoiM2I4ZjNkMjYtZmEzZC00MGY3LWE4NDAtYTcyZGViZjgzYzg2IiwiaG9zcGl0YWxJZCI6IjRjMzU5OGFkLTEyYjktNDAwYS1iZDg3LTBkN2UzZmJmMmM3YyIsImNpdmlzSG9zcGl0YWxJZCI6IlRFUy04WjZCIiwiaWF0IjoxNzQ1NzcyODU3LCJleHAiOjE3NDU4MTYwNTd9.sowkV2uLI-uFmPE3oUYJu4ZRALqxWZE5YR3v2hEAmzw'; // You would get a real token from backend
    //     dispatch(setToken(fakeToken));
    //     // const payload = JSON.parse(atob(fakeToken.split('.')[1]));
    //     // console.log(payload)
    //     navigate('/');
    //   } else {
    //     setError('Invalid email or password.');
    //   }
    // } catch (err) {
    //   console.log(err)
    //   setError('An error occurred. Please try again.');
    // }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center vh-100">
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <div className='d-flex justify-content-center mb-3 flex-column align-items-center'>
          <Image
            height={38}
            src={compnayLogo} alt="Logo" />
        </div>

        {/* <h2 className="text-center mb-4">Admin Login</h2> */}
        {error && <div className="alert alert-danger">{error}</div>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={true}
          validateOnChange
          onSubmit={(values) => {handleSubmit(values) }}
        >
          {
            ({ handleSubmit, handleChange,values }) => (<Form className='d-flex align-items-center flex-column gap-3 w-100 p-3' onSubmit={handleSubmit}>
          <div className='w-100 d-flex flex-column align-items-center gap-2'>
            <p className='fw-bold'>Reset Password</p>
            <p className='text-center'>Enter your registered email and we will send an otp to reset you password.</p>
            <div className='w-100'>
              <CustomInput
                type="email"
                placeholder="Enter your email"
                id="email"
                // icon='bi bi-envelope-fill'
                // value={values.email}
                name="email"
                label="Email"
                className="mb-3 w-100"
                required
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
          </div>


          <CustomButton
            loading={loading}
            type="submit"
            className="w-100 bg-primary rounded-1 w-100 p-2"
            variant="primary"
            title="Request"
          />

        </Form>)
          }
        </Formik>
        
        <div className="text-center mt-2">
          <p>
            Return to <a href="/login" className='text-info fw-medium'>Login</a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RequestResetPasswordPage;