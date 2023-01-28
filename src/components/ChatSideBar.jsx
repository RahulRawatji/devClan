import React from 'react'

const ChatSideBar = (props) => {
    const { userData } = props;
    
    const User = [{'userName':'Jane'},{'userName':"Peter"},{'userName':"Harry"}];

    return (
        <div className='flex flex-col border-r-2'>
            <div className='flex gap-3 justify-around p-4 border-b-2'>
                <h1 className='font-bold'>{userData?.displayName}</h1>
                <span>  <img style={{border:"1px solid blue", borderRadius:"50%", width:"30px",marginRight:"10px"}} src={userData?.photoURL} />
                </span>
            </div>
            <div>
                {User.map(user=>{
                    const { userName} = user;
                    return(
                        <div className='flex gap-5 items-center px-8 py-3 border-b-2 chat_user'>
                        <span className='border rounded-full p-3'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        </span>
                        <h1 className='font-bold'>{userName}</h1>
                        </div>
                    )
                })
                }
               
            </div>
        </div>
    )
}

export default ChatSideBar;