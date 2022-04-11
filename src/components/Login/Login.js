import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import logo from '../../images/google.svg'
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase/Firebase.init';
const Login = () => {
    let location = useLocation();
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let from = location.state?.from?.pathname || "/";
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(
        auth
      );
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const handleGoogle = () => {
        signInWithGoogle()
    }
   const handleEmail = (e) => {
    setEmail(e.target.value)
   }
   const handlePassword = (e) => {
       setPassword(e.target.value)
   }
   const handleSubmit = (e) => {
       e.preventDefault()
       signInWithEmailAndPassword(email, password)
       
    }
    if(user){
     navigate(from, { replace: true });
    }
    return (
  <div className="container">
            <div className='form-container'>
            <h2>Login</h2>
            <div>
     <form onSubmit={handleSubmit} className='form'>
  <div>
  <label className='label' htmlFor="email">Email</label> <br />
     <input onBlur={handleEmail} className='input-field' type="email" name='email' placeholder="Email" required/>
  </div>
   <div>
   <label className='label' htmlFor="password">Password</label> <br />
     <input onBlur={handlePassword} className='input-field' type="password" name='password' placeholder="password" required/>
   </div>
     <div>
     <button>Login</button>
     </div>
     </form>
     <p>New for EmaJohn <Link to='/signup'>Create New Account</Link> </p>
     <div className='line-parent'>
         <div className="line-left"></div>
         <p>or</p>
         <div className="line-right"></div>
     </div>
    <div className='reset'>
    <button className='reset-password'
        onClick={async () => {
          await sendPasswordResetEmail(email);
          alert('Sent email');
        }}
      >
        Forgotten password?
      </button>
    </div>
     <button onClick={handleGoogle} className='g-logo'>
         <img className='logo' src={logo} alt="" />
         Continue with Google
     </button>
            </div>
        </div>
  </div>
    );
};

export default Login;