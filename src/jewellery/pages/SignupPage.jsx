import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { MdOutlinePerson } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { auth,db } from '../components/Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';


const SignupPage = () => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState(''); // Fixed variable name casing
        const navigate = useNavigate(); // Fixed capitalization
        const { currentUser } = useAuth();
    
        const handleSignUp = async (e) => { 
            e.preventDefault();
            
            if (!name || !email || !password) {
                toast.error('Please fill in all fields');
                return;
            }
    
            try {
                // 1. Create user in Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("created account");

                await updateProfile(userCredential.user, {
                    displayName: name
                });
                
                // 2. Access the created user
                const user = userCredential.user;
                
                // 3. Save additional user data to Firestore
                await setDoc(doc(db, "users", userCredential.user.uid), { // Changed "Users" to "users"
                    name: name,
                    email: userCredential.user.email,
                    createdAt: new Date().toISOString()
                  });

                 // Force auth state refresh
                //  await auth.currentUser.reload();
    
                toast.success('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
            catch (error) {
                console.error(error);
                toast.error(`Registration failed: ${error.message}`);
            }
        };


  return (
    <>
    <Navbar />
    <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
    <div className="signup-section">

    <div className="sign-new">
            <div className="new-title">
                <h2>Welcom Back!</h2>
            </div>
            <div className="new-para">
                <p>To keep connected with us please
                login with your personal info</p>
            </div>
            <Link to='/login' >
            <div>
                <button className="new-button" >Login</button>
            </div>
            </Link>
        </div>
        <div className="sub-signup">
        <div className="signup-title">
        <h2>Create Account</h2>
        </div>
        <div className="signup-para">
            <p>Use your email for registration</p>
        </div>
        <form onSubmit={handleSignUp} >
        <div className='user-placeholder' >
            <div className="sign-user">
        <MdOutlinePerson />
            </div>
            <input onChange={(e) => setName(e.target.value)} name="name" className="name-button" type='text' value={name} placeholder='Name'/>
        </div>
        <div className='email-placeholder'>
        <i class='bx bx-envelope' ></i>
            <input onChange={(e) => setEmail(e.target.value)} name="email" className='login-email' type='email' value={email} placeholder='Email'/>
        </div>
        <div >
            <div className="sign-password">
            </div>
            <input onChange={(e) => setPassword(e.target.value)} name="password" className="login-password" type='password' value={password} placeholder='Password'/>
        </div>
        <div>
            <button type='submit' className="login-button" >Sign Up</button>
        </div>
        </form>
        <div className="main-not">
            <div className="not">
                <p>Already registerd? </p>
            </div>
            <Link to='/login' >
            <div className="register">
                <p>Login</p>
            </div>
            </Link>
        </div>
        </div>

    </div>
    </>
  )
}

export default SignupPage