import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../app/api';
import { Card, Form, Image } from 'react-bootstrap';
import CustomButton from '../components/custom-button/custom-button';
import compnayLogo from '../assets/images/bc-kash-logo.png';
import { toast } from 'react-toastify';
import '../styles/login-otp.scss'; // Ensure you have this CSS file for styling
import { ErrorMessage, Formik } from 'formik';
import CustomInput from '../components/custom-input/CustormInput';
import * as Yup from 'yup';

export interface ILogin {
email:string,
otp: string;
  newPassword: string;
}

const VerifyResetPasswordOtpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(600);
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const initialValues = {
        email:email,
        otp: '',
        newPassword: '',
      };
      const validationSchema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email format')
          .required('Email is required'),
        newPassword: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      });

    // Redirect if no email
    useEffect(() => {
        if (!email) {
            toast.warning('Email not found. Please login again.');
            navigate('/login');
        }
    }, [email, navigate]);

    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => setTimer(t => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (payload:ILogin) => {
    setLoading(true);
    // console.log({sending:payload});
    try {
      const res = await api.post('/staff/reset-password-with-otp',payload);
      toast.success('Password Updated!')
      navigate('/login');
      setLoading(false);
    } catch (error:any) {
        // console.log({seeEr:error?.data?.message})
        toast.error(error?.data?.message)
       setLoading(false);
    }
  };

    const handleResendOtp = async () => {
        setResendLoading(true);
        try {
            await api.post('/staff/request-password-reset-otp', { email });
            setTimer(600);
            toast.success('OTP resent successfully.');
        } catch (err) {
            toast.error('Failed to resend OTP');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="verify-otp-page d-flex align-items-center justify-content-center vh-100">
            <Card className="p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <div className='d-flex justify-content-center mb-3 flex-column align-items-center'>
                    <Image height={38} src={compnayLogo} alt="Logo" />
                </div>

                {/* <h5 className='text-center mb-3 fw-bold'></h5> */}
                

                {error && <div className="alert alert-danger text-center">{error}</div>}

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
            <p className='fw-bold'>Password Reset</p>
            <p className="text-center text-muted">OTP sent to <strong>{email}</strong></p>
            <div className='w-100'>
              <CustomInput
                type="number"
                placeholder="Enter OTP"
                id="otp"
                // icon='bi bi-envelope-fill'
                // value={values.email}
                name="otp"
                label="Enter OTP"
                className="mb-3 w-100"
                required
              />
              <ErrorMessage name="otp" component="div" className="text-danger" />
            </div>

            <div className='w-100'>
              <CustomInput
                type="password"
                placeholder="Enter New Password"
                id="newPassword"
                // icon='bi bi-lock-fill'
                icon2='bi bi-eye'
                name="newPassword"
                label="New Password"
                className="mb-3 w-100"
                // value={values.password}
                // onChange={handleChange}
                required
              />
              <ErrorMessage name="newPassword" component="div" className="text-danger" />
            </div>
          </div>


          <CustomButton
            loading={loading}
            type="submit"
            className="w-100 bg-primary rounded-1 w-100 p-2"
            variant="primary"
            title="Update"
          />
          <div className="text-center mt-3">
                        <p className="text-muted mb-1">OTP expires in <strong>{formatTime(timer)}</strong></p>
                        <button
                            type="button"
                            className="btn btn-link p-0 text-info fw-bold"
                            onClick={handleResendOtp}
                            disabled={resendLoading || timer > 0}
                        >
                            {resendLoading ? 'Resending...' : 'Resend OTP'}
                        </button>
                    </div>

        </Form>)
          }
        </Formik>
            </Card>
        </div>
    );
};

export default VerifyResetPasswordOtpPage;