import React, { useEffect, useState } from 'react'
import { auth, db } from './Firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'



const capitalizeFirstLetter = (str) => {
  return str?.charAt(0).toUpperCase() + str?.slice(1)?.toLowerCase() || ''}

const ProfilePersonal = () => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
      name: '',
      lastName: '',
      email: '',
      phoneNumber: ''
  });




  useEffect(() => {
      const fetchUserData = async () => {
          if (auth.currentUser) {
              try {
                  const userDocRef = doc(db, 'users', auth.currentUser.uid);
                  const userDoc = await getDoc(userDocRef);
                  
                  if (userDoc.exists()) {
                      const data = userDoc.data();
                      setUserData(data);
                      // Initialize form data with existing values
                      setFormData({
                          name: data.name || '',
                          lastName: data.lastName || '',
                          email: auth.currentUser.email || '',
                          phoneNumber: data.phoneNumber || ''
                      });
                  }
              } catch (error) {
                  console.error("Error fetching user data:", error);
              } finally {
                  setLoading(false);
              }
          }
      };

      fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
      e.preventDefault();
      setUpdating(true);
      setError('');
      setSuccess('');
      
      try {
          // Validate required fields
          if (!formData.name.trim() || !formData.lastName.trim()) {
              throw new Error('First name and last name are required');
          }

          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          
          await setDoc(userDocRef, {
              name: formData.name.trim(),
              lastName: formData.lastName.trim(),
              email: formData.email.trim(),
              phoneNumber: formData.phoneNumber.trim(),
              updatedAt: new Date()
          }, { merge: true });

          setSuccess('Profile updated successfully!');
          const updatedDoc = await getDoc(userDocRef);
          setUserData(updatedDoc.data());
      } catch (error) {
          setError(error.message);
          console.error("Update error:", error);
      } finally {
          setUpdating(false);
      }
  };

  const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
  };


  if (loading) {
      return <div>Loading user data...</div>;
  }

  return (
    <div className="peresonal-box">
      <div className="personal-title">
        <h3 className='p-title' >Personal Details</h3>
      </div>
      <div className="personal-main">
      <div className="personal-inputs">
        <form onSubmit={handleUpdate} >
        <div className="personal-name">
          <input type="text"
            placeholder='First Name'
            name='name'
            value={capitalizeFirstLetter(formData.name)}
            onChange={handleChange}
             />
        </div>

        <div className="personal-name">
          <input type="text" 
           placeholder='Last Name' 
           name='lastName'
           value={capitalizeFirstLetter(formData.lastName)}
           onChange={handleChange}
           />
        </div>

        <div className="personal-name">
          <input type="email" 
           placeholder='Email'
           name='email'
           value={capitalizeFirstLetter(formData.email)}
           onChange={handleChange}
           />
        </div>

        <div className="personal-name">
          <input type="tel" 
           placeholder='Phone Number'
           name='phoneNumber'
           value={capitalizeFirstLetter(formData.phoneNumber)}
           onChange={handleChange}
           />
        </div>

        <button className='personal-button'
             type='submit'
             disabled={updating} > 
          {updating ? 'Updating...' : 'Update Profile'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        </form>
      </div>
      </div>
    </div>
    )
}

export default ProfilePersonal







































// import React, { useEffect, useState } from 'react'
// import { auth, db } from './Firebase'
// import { doc, getDoc, setDoc } from 'firebase/firestore'



// const capitalizeFirstLetter = (str) => {
//   return str?.charAt(0).toUpperCase() + str?.slice(1)?.toLowerCase() || ''}

// const ProfilePersonal = () => {

//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({
//       name: '',
//       lastName: '',
//       email: '',
//       phoneNumber: ''
//   });




//   useEffect(() => {
//       const fetchUserData = async () => {
//           if (auth.currentUser) {
//               try {
//                   const userDocRef = doc(db, 'users', auth.currentUser.uid);
//                   const userDoc = await getDoc(userDocRef);
                  
//                   if (userDoc.exists()) {
//                       const data = userDoc.data();
//                       setUserData(data);
//                       // Initialize form data with existing values
//                       setFormData({
//                           name: data.name || '',
//                           lastName: data.lastName || '',
//                           email: auth.currentUser.email || '',
//                           phoneNumber: data.phoneNumber || ''
//                       });
//                   }
//               } catch (error) {
//                   console.error("Error fetching user data:", error);
//               } finally {
//                   setLoading(false);
//               }
//           }
//       };

//       fetchUserData();
//   }, []);

//   const handleUpdate = async (e) => {
//       e.preventDefault();
//       setUpdating(true);
//       setError('');
//       setSuccess('');
      
//       try {
//           // Validate required fields
//           if (!formData.name.trim() || !formData.lastName.trim()) {
//               throw new Error('First name and last name are required');
//           }

//           const userDocRef = doc(db, 'users', auth.currentUser.uid);
          
//           await setDoc(userDocRef, {
//               name: formData.name.trim(),
//               lastName: formData.lastName.trim(),
//               email: formData.email.trim(),
//               phoneNumber: formData.phoneNumber.trim(),
//               updatedAt: new Date()
//           }, { merge: true });

//           setSuccess('Profile updated successfully!');
//           const updatedDoc = await getDoc(userDocRef);
//           setUserData(updatedDoc.data());
//       } catch (error) {
//           setError(error.message);
//           console.error("Update error:", error);
//       } finally {
//           setUpdating(false);
//       }
//   };

//   const handleChange = (e) => {
//       setFormData({
//           ...formData,
//           [e.target.name]: e.target.value
//       });
//   };


//   if (loading) {
//       return <div>Loading user data...</div>;
//   }


//   return (
//     <div className='profile-section' >
      

//       <div className="detail-box">
//         <div className="p-title">
//       <h2 className='personal-title' >personal Details</h2>
//         </div>
//         <div className="personal-details">

//           <form onSubmit={handleUpdate} >
//           <div className="input-group">
//         <input 
//         name='name'
//         value={capitalizeFirstLetter(formData.name)}
//         onChange={handleChange}
//         type="text"  />
//       </div>

//       <div className="input-group">
//         <input 
//         name='lastName'
//         value={formData.lastName}
//         onChange={handleChange}
//         type="text"  />
//        </div>

//       <div className="input-group">
//         <input 
//         name='email'
//         value={formData.email}
//         onChange={handleChange}
//         type="email" />
//       </div>

//       <div className="input-group">
//         <input 
//         name='phoneNumber'
//         value={formData.phoneNumber}
//         onChange={handleChange}
//         type="tel" />
//       </div>

//       <div className="button-container">
//       <button
//       className='update-btn'
//       type='submit'
//       disabled={updating}
//       >
//       {updating ? 'Updating...' : 'Update Profile'}
//       </button>
//       </div>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}
//           </form>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProfilePersonal