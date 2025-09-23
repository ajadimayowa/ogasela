// src/App.tsx
import React from 'react';
import AppRouter from './routes/app-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="App">
      <AppRouter />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default App;
