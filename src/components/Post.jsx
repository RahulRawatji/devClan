import {auth,db} from '../utils/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';

const Post = () => {
  return (
    <>
      <div style={{width:"50%",marginLeft:"25%",borderRight:"1px solid grey",position:"fixed",bottom:"0",height:"89vh"}}>
        <form>
          <h1>Create a new Post</h1>
          <div>
            <h3>Description</h3>
            <textarea></textarea>
            <Button variant='contained'>Post</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Post