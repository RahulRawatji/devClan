import React from 'react'
import {auth} from '../utils/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

    const [user,loading] = useAuthState(auth);
    console.log(user);
    const navigator = useNavigate();
    const loginHandler = () =>{
        navigator('/login')
    }

    return (
        <>
            <div className='flex justify-between pt-7 px-8 pb-4 border-b-2'>
                <div className='flex'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
                </svg>

                    <h1 className='ml-4 text-xl text-bold'>DevClan</h1>
                </div>
                {
                    !user && (
                        <div className='flex gap-5'>
                            <button className='px-4 py-2 rounded bold'  style={{'border': "3px solid #3700B3"}} onClick={loginHandler}>Login</button>
                            <button className='px-4 py-2 rounded bold text-white' style={{'backgroundColor':"#3700B3"}}>Sign Up</button>
                        </div>
                    )
                }
                
            </div>
        </>
    )
}

export default Navbar