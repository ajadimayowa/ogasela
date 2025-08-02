import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setOrganisationData, setStaffProfile, setToken } from '../features/auth/authSlice';
import api from '../app/api';
import { Card, Form, Image } from 'react-bootstrap';
import CustomButton from '../components/custom-button/custom-button';
import compnayLogo from '../assets/images/bc-kash-logo.png';
import { toast } from 'react-toastify';
import '../styles/login-otp.scss'; // Ensure you have this CSS file for styling

const VerifyLoginOtpPage = () => {
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

    // Redirect if no email
    useEffect(() => {
        if (!email) {
            toast.warning('Email not found. Please login again.');
            navigate('/login', {replace:true});
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

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }

        if (updatedOtp.every(d => d.length === 1)) {
            handleSubmit(updatedOtp.join(''));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (otpCode?: string) => {
        const finalOtp = otpCode || otp.join('');
        if (finalOtp.length !== 6) return setError('Please enter all 6 digits');

        setLoading(true);
        try {
            const res = await api.post('/staff/verify-otp', { email, otp: finalOtp });
            if (res.status == 200) {
                console.log({dataSent:res?.data?.payload})
                const { payload } = res.data;
                console.log({seePayloadFromOtp:payload})
                const staffProfile = payload?.staffData;
                const orgData = payload?.organisationData;
                dispatch(setToken(payload?.token));
                dispatch(setStaffProfile(staffProfile));
                dispatch(setOrganisationData(orgData));
                toast.success('Login successful!');
                switch (payload?.staffData?.staffLevel) {
                    case 'super-admin':
                        navigate('/super-admin',{replace:true});
                        break;
                    case 'approver':
                        navigate('/approver/');
                        break;
                    case 'branch-manager':
                        navigate('/manager/');
                        break;
                    case 'marketer':
                        navigate('/marketer/');
                        break;
                    default:
                        navigate('/login');
                }
            }

        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setResendLoading(true);
        try {
            await api.post('/staff/login', { email });
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

                <h5 className='text-center mb-3 fw-bold'>Enter OTP</h5>
                <p className="text-center text-muted">OTP sent to <strong>{email}</strong></p>

                {error && <div className="alert alert-danger text-center">{error}</div>}

                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="d-flex flex-column align-items-center">
                    <div className="otp-inputs d-flex gap-2 justify-content-center mb-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => { if (el) inputsRef.current[index] = el; }}
                                className="otp-box form-control text-center"
                                style={{ width: '40px', height: '50px', fontSize: '24px' }}
                            />
                        ))}
                    </div>

                    <CustomButton
                        loading={loading}
                        type="submit"
                        title="Verify OTP"
                        className="w-100 bg-primary rounded-1 p-2"
                        variant="primary"
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
                </Form>
            </Card>
        </div>
    );
};

export default VerifyLoginOtpPage;