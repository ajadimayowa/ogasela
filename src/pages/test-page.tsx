// src/pages/Login.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/login.scss';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');

//     try {
//       // Simulated login API call
//       if (email === 'admin@example.com' && password === 'password') {
//         const fakeToken = 'fake.jwt.token'; // You would get a real token from backend
//         dispatch(setToken(fakeToken));
//         navigate('/');
//       } else {
//         setError('Invalid email or password.');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     }
//   };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <h1>Profile here</h1>
    </div>
  );
};

export default ProfilePage;