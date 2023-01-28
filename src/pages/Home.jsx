import React, { useId } from "react";
import { useNavigate, Link} from "react-router-dom";
import Header from "../components/Header";
import HomeNav from "../components/HomeNav";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import Message from "../components/Message";
import './Home.css';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import {auth,db} from '../utils/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useEffect,useState} from "react";
import {addDoc,collection,serverTimestamp,onSnapshot, orderBy, query} from "firebase/firestore";


const Home = () => {

    const navigate = useNavigate();
    const [user,loading] = useAuthState(auth);
    const [post, setPost] = useState({description:""});
    const [allPosts, setAllPosts] = useState([]);

    const getPosts = async () => {
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;
      };

      useEffect(() => {
        getPosts();
      }, []);

    function logOut(){
        navigate("/login");
    }

    function login(){
        navigate("/home");
    }
      if(loading) return;
      if(!user) return logOut();

      const chatRouter = () =>{
        navigate('/chat', {state:{user}});
    }


      const submitPost = async(e)=>{
        e.preventDefault();
        const collectionRef = collection(db,"posts");
        await addDoc(collectionRef,{
            ...post,
            timestamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName,

        });
        setPost({description: ""});
        return login();
      };

    //const Posts = [{'user':'Alex',"comment":{"there":"present"}}, {"user":'Pain',"comment":{"there":"present"}}, {"user":'thor'}]
    return (
        <>
            <div className="home_grid">
                <div className="p-2 min-h-full" style={{ borderRight: "1px solid grey" }}>
                    <Stack spacing={5} style={{ paddingTop: "10vh", display: "flex", alignItems: "center" }}>
                        <Button variant="text" style={{ width: "50%" }} onClick={() => navigate("/home")}>
                            <HomeRoundedIcon fontSize="large" style={{ paddingRight: "10px" }} />
                            Home</Button>
                        <Button variant="text" style={{ width: "50%" }}>
                            <SettingsSuggestRoundedIcon fontSize="large" style={{ paddingRight: "10px" }} />
                            Settings
                        </Button>
                            <Button variant="text" style={{width:"50%"}} onClick={()=>navigate("/profile")}> 
                                <img style={{border:"1px solid blue", borderRadius:"50%", width:"30px",marginRight:"10px"}} src={user.photoURL} />
                                Profile
                            </Button>

            <Button onClick={()=>auth.signOut()} variant="contained">Sign out</Button>
            <Button onClick={chatRouter} variant="contained">Chat</Button>
                    </Stack>
                </div>
                {/* <HomeNav /> */}
                <div className="flex flex-col gap-2 p-16" style={{ minWidth: '70%' }}>
                    <form onSubmit={submitPost} className="p-4 flex flex-col gap-3 rounded" style={{ border: '2px solid' }}>
                        {/* <div>
                            <lable className="pr-4 font-bold text-xl">Title</lable>
                            <input className="w-full p-3 mt-3 border" placeholder="Enter Post Title"></input>
                        </div> */}
                        <div>
                            <lable className="font-bold pr-4 text-xl">Post</lable>
                            <textarea value={post.description}  onChange={(e) => setPost({ ...post, description: e.target.value })} className="w-full p-3 mt-3 h-20 border " placeholder="Enter Post"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="border text-white px-5 py-2" style={{ backgroundColor: '#3700B3' }}>Post</button>
                        </div>

                    </form>

                    <h2>Your Feed</h2>

                    {allPosts.map((post) => (
                        <Message key={post.id} {...post}>
                            <a href={{ pathname: `/${post.id}`, query: { ...post } }}>
                            <button>
                                {post.comments?.length > 0 ? post.comments?.length : 0} comments
                            </button>
                            </a>
                        </Message>
                    ))}




                    {/* {Posts.map(post => {
                        const { user , comment} = post;
                        return (
                                <div className="flex  border rounded m-4">
                                    <div className="p-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col gap-4 p-4">
                                        <div>
                                        <h1 className="font-bold">How To center a DIv?</h1>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ipsam aliquam debitis! Cum id consequatur quod et est officia rem, deserunt corrupti eos delectus earum omnis! Inventore, id! Dolores, harum.</p>
                                        </div>
                                        {comment && <>
                                            <p className="px-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam optio doloribus, officiis doloremque magni exercitationem quisquam nihi.</p>
                                        </>}
                                        <div className="flex min-w-full justify-around">
                                            <input className="border p-2 mx-2" style={{minWidth:'70%'}}/>
                                            <button className="border px-4 text-white"style={{ backgroundColor: '#3700B3' }} >Comment</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            )
                    })} */}
                </div>
                <div>

                </div>
                {/* <Feed /> */}
            </div>
        </>
    )
}

export default Home