import React,{useState} from 'react'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {  createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth,storage,db} from '../firebase'
import { doc, setDoc } from "firebase/firestore"
import {Link} from 'react-router-dom'
import add from '../img/addAvatar.png'
import {useNavigate} from 'react-router-dom'
const Register = () => {
const [err, setErr] = useState(false)
const [password, setpassword] = useState('')
const [loading, setLoading] = useState(false);
const navigate =useNavigate();
const handleSubmit = async (e) => {
  setLoading(true);
  e.preventDefault();
  const displayName = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;
  const file = e.target[3].files[0];

  try {
    //Create user
    const res = await createUserWithEmailAndPassword(auth, email, password);

    //Create a unique image name
    const date = new Date().getTime();
    const storageRef = ref(storage, displayName );

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          //Update profile
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          //create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          //create empty user chats on firestore
          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/");
        } catch (err) {
          console.log(err);
          setErr(true);
          setLoading(false);
        }
      });
    });
  } catch (err) {
    setErr(true);
    setLoading(false);
  }
};

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Chat Room</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
            <input required type="text" placeholder='display name'/>
            <input required type="email" placeholder='input email'/>
            <input required type="password" placeholder='password'/>
            <input style={{display:"none"}} type="file" id='file'/>
            <label htmlFor='file'>
             <img src={add} alt=''/>
             <span>Add avatar</span>
            </label>

            <button>Sign up</button>
           {err && <span>something went wrong</span>}
        </form>
        <p>have an account<Link to="/login">SignIn</Link></p>
      </div>
    </div>
  )
}

export default Register
