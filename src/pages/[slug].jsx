import Message from "../components/Message";
import { useNavigate ,useLocation, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  collection
} from "firebase/firestore";

const AddComments = () =>{

    
}

export default AddComments