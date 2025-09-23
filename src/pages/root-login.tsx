// src/pages/Login.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setRootAdminProfile, setToken } from '../features/auth/authSlice';
import { Form, Button, Card, Image } from 'react-bootstrap';
import '../styles/owner.scss';
import compnayLogo from '../assets/images/fsh-logo.png'; // Adjust the path as necessary
import CustomInput from '../components/custom-input/CustormInput';
import CustomButton from '../components/custom-button/custom-button';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import api from '../app/api';
import { toast } from 'react-toastify';
import ReusableInputs from '../components/custom-input/ReusableInputs';
import CustomButtonOwner from '../components/custom-button/custom-button-owner';

export interface ILogin {
  email: string;
  password: string;
}

const color = '#192252'; // You can change this to any color you want
const RootLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (payload:ILogin) => {
    setLoading(true);
    // console.log({sending:payload});
    try {
      const res = await api.post('/creator/login',payload);
      dispatch(setToken(res.data.payload.token));
      dispatch(setRootAdminProfile(res.data.payload.creatorData));
      setLoading(false);
      navigate('/root-admin/dashboard');
      toast.success('Login successful');
    } catch (error:any) {
      console.log({errorHere:error})
      setLoading(false);
       if(error?.data?.message){
        toast.error(error?.data?.message)
       } else{
       console.log({seeError:error})
       toast.error(error?.message)
       }
    }
  };

  return (
    <div className="owner-page d-flex align-items-center justify-content-center vh-100">
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
            <p className='fw-bold'>Root Admin Login</p>
            <div className='w-100'>
              <ReusableInputs
              inputType='email'
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

            <div className='w-100'>
              <ReusableInputs
              inputType='password'
                type="password"
                placeholder="Enter your password"
                id="password"
                // icon='bi bi-lock-fill'
                icon2='bi bi-eye'
                name="password"
                label="Password"
                className="mb-3 w-100"
                // value={values.password}
                // onChange={handleChange}
                required
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
          </div>


          <CustomButtonOwner
            loading={loading}
            type="submit"
            className={`w-100 rounded-1 w-100 p-2`}
            variant="primary"
            title="Login"
          />

        </Form>)
          }
        </Formik>
        
        {/* <div className="text-center mt-2">
          <p>
            Forgot your password? <a href='/request-password-reset-otp' className='fw-medium' style={{ color: color ?? '#1A5745' }}>Reset it here</a>
          </p>
        </div> */}
      </Card>
    </div>
  );
};

export default RootLoginPage;