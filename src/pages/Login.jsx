import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";

import './Login.css';

const Login = () => {

  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  function login() {
    navigate("/home");
  }

  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {

    try {
      const result = await signInWithPopup(auth, googleProvider);
      login();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      login();
    }
    else {
      console.log("login");
    }
  }, [user]);


  return (
    <>
      <div className='min-h-screen flex justify-center items-center -mt-24 '>
        <div className='grid grid-cols-2 p-32'>
          <div className='p-8 flex gap-5 flex-col justify-center'>
            <h1 className='font-bold text-3xl'>Share your knowledge with your fellow Developers.</h1>
            <h1 className='text-xl font-bold'>Solve your doubt in 1:1 sessions</h1>
            <p className='text-lg'>Guide them, mentor them, help them change their lives. It's more satisfying than you think. And takes 2 minutes to get started</p>
          </div>
          <div className='p-12'>
            <div className='flex flex-col login_container gap-5 border p-16 rounded' style={{ "backgroundColor": "#F9F4F0" }}>
              <h1 className='text-3xl font-bold'>Sign in</h1>
              <form className='flex flex-col gap-5'>
                <input className="p-3 border" placeholder='Enter Name' />
                <input className="p-3 border" placeholder='Enter Name' />
                <button className='font-bold rounded bg-gray-800 p-4 text-white'>Sign-in</button>
                <p className='text-center'>or</p>
                <button className='rounded p-2 text-white' type='button' onClick={GoogleLogin} style={{ backgroundColor: "grey" }} >
                  Sign in with Google <GoogleIcon />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default Login