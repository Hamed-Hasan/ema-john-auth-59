import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../images/google.svg'
import { BiError } from 'react-icons/bi';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { auth } from '../../Firebase/Firebase.init';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
const provider = new GoogleAuthProvider();
const SignUp = () => {
    const navigate = useNavigate()
   const [users, setUser] = useState({});
   const [email, setEmail] = useState({value: '', error: ''});
   const [password, setPassword] = useState({value: '', error: ''});
   const [confirmPassword, setConfirmPassword] = useState({value: '', error: '', success:''});
   const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

const handleSubmit = (e) => {
    e.preventDefault();
    if (email.value === "") {
        setEmail({ value: "", error: "Email is required" });
      }
    if(password.value === ''){
        setPassword({value: '', error: 'please type field out the password field'})
    }
    if(confirmPassword.value === ''){
        setConfirmPassword({value: '', error: 'please type field out the confirm password field'})
    }



    createUserWithEmailAndPassword(email.value, password.value)
}
if(user){
    navigate('/login')
}
const handleEmail = (event) => {
    const emailInput = event.target.value
    if (/\S+@\S+\.\S+/.test(emailInput)) {
        setEmail({ value: emailInput, error: "" });
      } else {
        setEmail({ value: "", error: "Please Provide a valid Email" });
      }
}
const handlePassword = (event) => {
    const passwordInput = event.target.value
    if (passwordInput.length < 5) {
        setPassword({ value: "", error: "Password too short" });
      } else if (!/(?=.*[0-9])/.test(passwordInput)) {
        setPassword({
          value: "",
          error: "Password must contain a capital letter",
        });
        toast.error("Password must contain a capital letter.")
      } else {
        setPassword({ value: passwordInput, error: "" });
      }
}
const handleConfirmPassword = (event) => {
    const confirmPasswordInput = event.target.value
    if(password.value !== confirmPasswordInput) {
        setConfirmPassword({value: '',error: 'type same characters', success:''})
        toast.error("type same characters")
    }else {
        setConfirmPassword({
            value: confirmPasswordInput,
             error: '', 
             success:'correct all set!'
            })
            toast.success('correct all set!')
    }
    
}


    const handleGoogle = () => {
        signInWithPopup(auth, provider)
        toast.success('Successfully sign up!')
        .then((result) => {
          const user = result.user;
          setUser(user)
          console.log(user)
        }).catch((error) => {
       console.log(error)
        });
       
    }
    // const notify = () => 
    return (
       <div className="container">
            <div className='form-container'>
        <h2>Sign Up </h2>
        {/* <button onClick={notify}>Make me a toast</button> */}
      <Toaster />
        <div>
 <form onSubmit={handleSubmit} className='form'>
<div>
<label className='label' htmlFor="email">Email</label> <br />
 <input onBlur={handleEmail} className='input-field' type="email" name='email' placeholder="Email" />
{email.error && (
    <p className='error'>
      <BiError />  {email.error}
    </p>
)}
</div>
<div>
<label className='label' htmlFor="password">Password</label> <br />
 <input onBlur={handlePassword} className='input-field' type="password" name='password' placeholder="password" />
 {password.error && (
    <p className='error'>
      <BiError />  {password.error}
    </p>
)}

</div>
<div>
<label className='label' htmlFor="confirmPassword">Confirm Password</label> <br />
 <input onBlur={handleConfirmPassword} className='input-field' type="password" name='confirmPassword' placeholder="confirm password" />
 {confirmPassword.error && (
    <p className='error'>
      <BiError />  {confirmPassword.error}
    </p>
)}
 {confirmPassword.success && (
    <p className='success'>
      <BsFillPersonCheckFill />  {confirmPassword.success}
    </p>
)}
</div>
 <div>
 <button>Sign Up</button>
 </div>
 </form>
 <p>New for EmaJohn <Link to='/login'>Account Already Have</Link> </p>
 <div className='line-parent'>
     <div className="line-left"></div>
     <p>or</p>
     <div className="line-right"></div>
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

export default SignUp;