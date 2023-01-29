import React from "react";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import './Home.css';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import { auth, db } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, orderBy, query } from "firebase/firestore";


const Home = () => {

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [post, setPost] = useState({ description: "" });
    const [allPosts, setAllPosts] = useState([]);
    const [isDoubt, setIsDoubt] = useState();
    const [doubtsData, getDoubtsData] = useState();


    const getDoubts = async () => {
        const collectionRef = collection(db, "doubt");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            getDoubtsData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;
    };

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
        getDoubts();
    }, []);

    function logOut() {
        navigate("/");
    }

    function login() {
        navigate("/home");
    }
    if (loading) return;
    if (!user) return logOut();

    const chatRouter = (id) => {
        navigate(`/chat?id=${id}`);
    }

    const submitPost = async (e) => {
        e.preventDefault();
        if (isDoubt === 'doubt') {
            const { description } = post;
            const collectionRef = collection(db, "doubt");
            await addDoc(collectionRef, {
                text: description,
                timestamp: serverTimestamp(),
                userId: user.uid,
                avatar: user.photoURL,
                username: user.displayName,
            });

        } else {
            const collectionRef = collection(db, "posts");
            await addDoc(collectionRef, {
                ...post,
                timestamp: serverTimestamp(),
                user: user.uid,
                avatar: user.photoURL,
                username: user.displayName,

            });
        }

        setPost({ description: "" });
        return login();
    };

    return (
        <>
            <div className="home_grid">
                <div className="p-2 min-h-full" style={{ backgroundColor: '#F5F5F5' }}>
                    <Stack spacing={5} style={{ paddingTop: "10vh", display: "flex", alignItems: "center" }}>
                        <Button variant="text" style={{ width: "50%" }} onClick={() => navigate("/home")}>
                            <HomeRoundedIcon fontSize="large" style={{ paddingRight: "10px" }} />
                            Home</Button>
                        <Button variant="text" style={{ width: "50%" }}>
                            <SettingsSuggestRoundedIcon fontSize="large" style={{ paddingRight: "10px" }} />
                            Settings
                        </Button>
                        <Button variant="text" style={{ width: "50%" }} onClick={() => navigate("/profile")}>
                            <img style={{ border: "1px solid blue", borderRadius: "50%", width: "30px", marginRight: "10px" }} src={user.photoURL} />
                            Profile
                        </Button>

                        <Button onClick={() => auth.signOut()} variant="contained">Sign out</Button>

                    </Stack>
                </div>

                <div className="flex flex-col gap-2 p-16" style={{ minWidth: '70%' }}>
                    <form onSubmit={submitPost} className="p-5 mb-3 flex flex-col gap-3 rounded formContainer" style={{"backgroundColor":"#F9F4F0"}}>
                        <div>
                            <lable className="font-bold pr-4 text-xl">Post</lable>
                            <textarea value={post.description} onChange={(e) => setPost({ ...post, description: e.target.value })} className="w-full p-3 mt-3 h-20 border" placeholder="Enter Post"></textarea>
                            <div className="flex gap-4">
                                <label className="font-bold">Doubt</label>
                                <input type='radio' name='doubt' value='doubt' onChange={(e) => setIsDoubt(e.target.value)} />
                                <label className="font-bold">Post</label>
                                <input type='radio' name='doubt' value='post' onChange={(e) => setIsDoubt(e.target.value)} />
                            </div>

                        </div>
                        <div>
                        <Button type="submit" variant="contained">Submit</Button>
                        </div>

                    </form>
                    <div className="grid grid-cols-2 content_Container">
                        <div className="border px-3 py-2">
                            <h1 className="font-bold text-2xl px-3 py-2">POSTS</h1>
                            <div className="doubtContainer">
                            {allPosts.map((post) => (
                                <Message key={post.id} {...post}>
                                    <a href={{ pathname: `/${post.id}`, query: { ...post } }}>
                                        <button>
                                            {post.comments?.length > 0 ? post.comments?.length : 0} comments
                                        </button>
                                    </a>
                                </Message>
                            ))}
                             </div>
                        </div>
                        <div className="border px-3 py-2">
                            <h1 className="font-bold text-2xl px-3 py-2">DOUBTS</h1>
                            <div className="doubtContainer">
                            {doubtsData?.map((doubt) => {
                                const { avatar, text,id } = doubt;
                                return (
                                    <div className="m-3 p-2 rounded" style={{backgroundColor:"#E8D2A6"}}>
                                        <div className="flex p-4 items-center">
                                            <img className='rounded-full m-1' style={{ width: "40px" }} src={avatar} />
                                            <h1>{text}</h1>

                                        </div>
                                        <div className="p-5 flex gap-3">
                                        <Button onClick={()=>chatRouter(id)} variant="contained">Chat</Button>
                                        <Button href="https://meet.new" variant="outlined" color="success">Video</Button>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>

                    </div>
                </div>
                <div>

                </div>
                {/* <Feed /> */}
            </div>
        </>
    )
}

export default Home