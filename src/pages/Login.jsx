import React from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const navigate = useNavigate();
  const loginHandler = () =>{
    navigate('/home')
  }
  return (
    <>
      <div className='min-h-screen flex justify-center items-center -mt-24 '>
        <div className='grid grid-cols-2 p-32'>
          <div className='p-8 flex gap-5 flex-col justify-center'>
              <h1 className='font-bold text-3xl'>Share your knowledge with your followers
Let your followers book 1:1 sessions with you. </h1>
<p className='text-lg'>Guide them, mentor them, help them change their lives. It's more satisfying than you think. And takes 2 minutes to get started</p>
          </div>
          <div className='p-12'>
        <div className='flex flex-col gap-5 border p-16 rounded' style={{"backgroundColor":"#F9F4F0"}}>
          <h1 className='text-3xl font-bold'>Sign in</h1>
          <form className='flex flex-col gap-5'>
            <input className="p-3 border" placeholder='Enter Name'/>
            <input className="p-3 border" placeholder='Enter Name'/>
            <button className='font-bold rounded bg-gray-800 p-4 text-white' onClick={loginHandler}>Sign-in</button>
          </form>
        </div>
        </div>
        </div>
      </div>
    </>
    
  )
}

export default Login