import React, { useState } from 'react';
import Add from '../Images/addAvatar.png';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { db } from '../Firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [error, setError] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    console.log("email:", email);
    console.log("password:", password);

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log("response:", response);

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('error', (error) => {
        console.error("Error uploading file:", error);
        setError(true);
      });

      uploadTask.on('state_changed', (snapshot) => {
        // You can track upload progress here if needed
      }, (error) => {
        console.error("Error uploading file:", error);
        setError(true);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            try {
              await updateProfile(response.user, {
                displayName,
                photoURL: downloadURL
              });
              await setDoc(doc(db, "users", response.user.uid), {
                displayName,
                email,
                photoURL: downloadURL,
                uid: response.user.uid
              });
              await setDoc(doc(db, "userChats", response.user.uid), {}); // Create an empty document
              console.log("Profile updated");
              Navigate('/')
            } catch (error) {
              console.error("error:", error);
              setError(true);
            }
          });
      });

    } catch (error) {
      console.error("error:", error);
      setError(true);
    }
  }

  return (
    <div className='formContainter'>
      <div className='formWrapper'>
        <span className='Logo'>Let's Chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter Your name' className='Logininput'></input>
          <input type='email' placeholder='Enter Email' className='Logininput'></input>
          <input type='password' placeholder='Enter Password' className='Logininput'></input>
          <input type='file' id='file' style={{ display: "none" }}></input>
          <label htmlFor='file'>
            <img src={Add} alt='AddAvatar' className='Avatar' />
            <span>Add an Avatar</span>
          </label>
          <button className='Loginbutton'>Sign Up</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>Already have an account? <Link to ="/login">Login In</Link> </p>
      </div>
    </div>
  );
}

export default Register;
