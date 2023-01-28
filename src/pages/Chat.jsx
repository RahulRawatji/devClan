import React from 'react';
import './Chat.css';

import ChatSideBar from '../components/ChatSideBar';
import ChatBox from '../components/ChatBox';


const Chat = () => {
    return (<>
        <div className='min-h-screen flex justify-center items-center '>
            <div className='-mt-32 gap-5  border chatContainer'>
                <ChatSideBar />
                <ChatBox />
            </div>
        </div>
        </>
    )
}

export default Chat