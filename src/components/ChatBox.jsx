import React from 'react'
import './ChatBox.css';

const ChatBox = () => {
  return (
    <div className='chatbox_container'>
        <div className='border border-b-3 p-4'>
            <h1 className='font-bold'>Jane</h1>
        </div>
        <div className='chatBox_messages_container'>

        </div>
        <div className='flex gap-3'>
            <input className='p-2' placeholder='Enter Your Message' style={{minWidth:"80%"}}/>
            <button className='px-5 py-3 rounded bg-slate-200'>Send</button>
        </div>
    </div>
  )
}

export default ChatBox