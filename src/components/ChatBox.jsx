import React, { useState, useEffect } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../utils/firebase';
import { collection, query, where, onSnapshot, doc,  orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

import './ChatBox.css';

const ChatBox = () => {
  const [messageData, setMessageData] = useState();
  const [message, setMessage] = useState();

  const [user, loading] = useAuthState(auth);


  const getPost = async () => {
    const collectionRef = collection(db, 'messages');
    const q = query(collectionRef, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessageData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    });

    return unsubscribe;
  };


  useEffect(() => {
    getPost();
  }, []);

  async function sendMessage(e) {
    e.preventDefault()
    const { uid, photoURL, displayName } = auth.currentUser;
    console.log(auth.currentUser);
    const collectionRef = collection(db, 'messages');

    await addDoc(collectionRef, {
      text: message,
      createdAt: serverTimestamp(),
      userId: uid,
      photoUrl: photoURL,
    })
    setMessage('')
  }
  

  return (
    <div className='chatbox_container'>
      <div className='border border-b-3 p-4'>
        <h1 className='font-bold'>Jane</h1>
      </div>
      <div className='chatBox_messages_container'>
        {messageData?.map(msg => {
          const { uid } = auth.currentUser;
          const { text, userId, photoUrl } = msg;
          const msgUser = userId === uid ? 'sender' : 'receiver';

          return (   
            <h1 className='p-2 border-b-2 m-1 flex items-center' style={{ backgroundColor: msgUser == "sender" ? 'cyan' : 'orange', textAlign: msgUser == "sender" ? 'right' : 'left' }}> {msgUser == "receiver" ? <img  className='rounded-full m-2' style={{ border: "1px solid blue", width: "30px", marginRight: "10px"}} src={photoUrl} /> : ""}{text}</h1>
    
          )
        })}
      </div>

      <form onSubmit={sendMessage} className='flex gap-3'>
        <input className='p-2' value={message} placeholder='Enter Your Message' style={{ minWidth: "80%" }} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit" className='px-5 py-3 rounded bg-slate-200'>Send</button>
      </form>
    </div>
  )
}

export default ChatBox