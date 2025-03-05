import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link,  useNavigate } from 'react-router-dom'
import { auth } from '../components/Firebase'
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { toast, ToastContainer } from 'react-toastify'



const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);

            console.log("logged")
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            toast.error(`Login failed: ${error.message}`);
            let errorMessage = 'Login failed'; // default error message

            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address'
                    break
                case 'auth/user-disabled':
                    errorMessage = 'Account disabled'
                    break
                case 'auth/user-not-found':
                    errorMessage = 'User not found'
                    break
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password'
                    break
                case 'auth/too-many-requests':
                    errorMessage = 'Too many attempts. Try again later'
                    break
            }
            
            toast.error(errorMessage)
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
    <div className="login-section">
        <div className="sub-login">
        <div className="login-title">
        <h2>Login to your Account</h2>
        </div>
        <div className="login-para">
            <p>Login using  your google account</p>
        </div>
        <div className='google-placeholder' >
            <i className='bx bxl-google'></i>
            <button className='google-button' >Login With Google</button>
        </div>
        <div>
        <form onSubmit={handleLogin} >
        <div>
            <input onChange={(e) => setEmail(e.target.value)} name="email" className='login-email' type='email' value={email} placeholder='Email'/>
        </div>
        <div >
            <input onChange={(e) => setPassword(e.target.value)} name="password" className="login-password" type='password' value={password} placeholder='Password'/>
        </div>
        <div className="main-para">
            <div className="forgot">
                <p>Forgotten your password?</p>
            </div>
            <div className="otp">
                <p>Request OTP!</p>
            </div>
        </div>
        <div>
            <button type='submit' className="login-button" >Login</button>
        </div>
        </form>
        </div>
        <div className="main-not">
            <div className="not">
                <p>Not a Member? </p>
            </div>
            <Link to='/signup' >
            <div className="register">
                <p>Sign Up</p>
            </div>
            </Link>
        </div>
        </div>
        <div className="sub-new">
            <div className="new-title">
                <h2>New Here</h2>
            </div>
            <div className="new-para">
                <p>Your are my valuable customer</p>
            </div>
            <Link to='/signup' >
            <div>
                <button className="new-button" >Sign Up</button>
            </div>
            </Link>
        </div>
    </div>
    </>
  )
}

export default LoginPage;