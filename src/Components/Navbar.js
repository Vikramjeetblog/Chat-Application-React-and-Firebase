import React, { useContext } from 'react'

import { auth } from '../Firebase'
import { signOut } from "firebase/auth";
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className='Navbar'>
      <span className='logo'> Let's Chat</span>
      <div className='User'>
        <img src={currentUser.photoURL}  alt=""className='Userimage' />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Log Out</button>
      </div>
    </div>
  )
}

export default Navbar