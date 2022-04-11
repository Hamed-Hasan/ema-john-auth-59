
import React, { useState } from 'react';
import { useAuthState, useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase/Firebase.init';

const Inventory = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [user] = useAuthState(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(
        auth
      );
    const [
        signInWithEmailAndPassword,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
   

   
   const handleEmail = (e) => {
    setEmail(e.target.value)
   }
   const handlePassword = (e) => {
       setPassword(e.target.value)
   }
   const handleName = (e) => {
    setName(e.target.value)
   }
   const handleAddress = (e) => {
       setAddress(e.target.value)
   }
   const handleSubmit = (e) => {
       e.preventDefault()
    //    signInWithEmailAndPassword(email, password)
    const shipment = {name, address, email, password} 
       console.log(shipment)
    }


    
    return (
        <div className="container">
            <div className='form-container'>
            <h2>Shipment Details</h2>
            <div>
     <form onSubmit={handleSubmit} className='form'>
  <div>
  <label className='label' htmlFor="name">Name</label> <br />
     <input onBlur={handleName} className='input-field' type="text" name='name' placeholder="Name" required/>
  </div>
  <div>
  <label className='label' htmlFor="address">Address</label> <br />
     <input onBlur={handleAddress} className='input-field' type="text" name='address' placeholder="Address" required/>
  </div>
  <div>
  <label className='label' htmlFor="email">Email</label> <br />
     <input onBlur={handleEmail} className='input-field' value={user?.email} type="email" name='email' placeholder="Email" required/>
  </div>
   <div>
   <label className='label' htmlFor="password">Password</label> <br />
     <input onBlur={handlePassword} className='input-field' type="password" name='password' placeholder="password" required/>
   </div>
     <div>
     <button>Shipment</button>
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
   
            </div>
        </div>
  </div>
    );
};

export default Inventory;