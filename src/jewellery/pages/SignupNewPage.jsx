// import { doc, setDoc } from 'firebase/firestore';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../path/to/your/firebase-config'; // Update with your Firebase config path
// import { toast } from 'react-toastify'; // Add toast notification library

// const SignupNewPage = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState(''); // Fixed variable name casing
//     const navigate = useNavigate(); // Fixed capitalization

//     const handleSignUp = async (e) => { 
//         e.preventDefault();
        
//         if (!name || !email || !password) {
//             toast.error('Please fill in all fields');
//             return;
//         }

//         try {
//             // 1. Create user in Firebase Authentication
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
//             // 2. Access the created user
//             const user = userCredential.user;
            
//             // 3. Save additional user data to Firestore
//             await setDoc(doc(db, "Users", user.uid), {
//                 name: name, // Use state value instead of user.name
//                 email: user.email,
//                 // Removed password storage (security risk)
//                 createdAt: new Date().toISOString()
//             });

//             toast.success("User Registered Successfully!!");
//             navigate('/'); // Redirect after successful registration
//         }
//         catch (error) {
//             console.error(error);
//             toast.error(`Registration failed: ${error.message}`);
//         }
//     };

//     return (
//         <div className="signup-container">
//             <h2>Sign Up</h2>
//             <form onSubmit={handleSignUp}>
//                 <div className="form-group">
//                     <label>Name:</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Sign Up</button>
//             </form>
//         </div>
//     );
// };

// export default SignupNewPage;











// this is old code
    // const [data, setData] = useState({
    //     name:'',
    //     email:'',
    //     password:''
    // })
    // const {name, email, password} = data

    // const Navigate = useNavigate();
    // const changeHandler =  (e) => {
    //     setData({...data, [e.target.name]:e.target.value})
    // }
    // const signUp = (e) => {
    //     e.preventDefault();
        
    //     if (!name || !email || !password) {
    //         toast.error('Please fill in all fields');
    //         return;
    //     }

    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then(() => {
    //             toast.success('Account created successfully! Redirecting to login...');
    //             setTimeout(() => {
    //                 Navigate('/login');
    //             }, 2000);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             let errorMessage = 'Failed to create account. Please try again.';
                
    //             // Handle specific error cases
    //             if (err.code === 'auth/email-already-in-use') {
    //                 errorMessage = 'Email already in use!';
    //             } else if (err.code === 'auth/weak-password') {
    //                 errorMessage = 'Password should be at least 6 characters';
    //             } else if (err.code === 'auth/invalid-email') {
    //                 errorMessage = 'Invalid email address!';
    //             }
                
    //             toast.error(errorMessage);
    //         });
    // };





    // login 
    // const [data, setData] = useState({
    //     email:'',
    //     password:'',
    //     name: ''
    // })
    // const {email, password, name} = data

    // const Navigate = useNavigate();

    // const changeHandler = (e) => {
    //     setData({...data, [e.target.name]:e.target.value})
    // }
    // const login = e => {
    //     e.preventDefault();
    //     if (!email || !password) {
    //         toast.error('Please fill in all fields');
    //         return;
    //     }
    //     signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         // Update user profile with name
    //         return updateProfile(userCredential.user,{
    //             displayName: name
    //         })
    //     })
    //     .then(() => {
    //         console.log("User Logged in successfully!");
    //         Navigate('/');
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //         let errorMessage = 'Login failed. Please try again.'
            
    //         // Handle specific error cases
    //         switch (err.code) {
    //             case 'auth/invalid-email':
    //                 errorMessage = 'Invalid email address'
    //                 break
    //             case 'auth/user-disabled':
    //                 errorMessage = 'Account disabled'
    //                 break
    //             case 'auth/user-not-found':
    //                 errorMessage = 'User not found'
    //                 break
    //             case 'auth/wrong-password':
    //                 errorMessage = 'Incorrect password'
    //                 break
    //             case 'auth/too-many-requests':
    //                 errorMessage = 'Too many attempts. Try again later'
    //                 break
    //         }
            
    //         toast.error(errorMessage)
    //     })

    // };

