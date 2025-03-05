import React from 'react'
import { useAuth } from '../context/AuthContext'



const capitalizeFirstLetter = (str) => {
  return str?.charAt(0).toUpperCase() + str?.slice(1)?.toLowerCase() || ''}

const ProfilePersonal = () => {

  const {currentUser} = useAuth();

  return (
    <div className='profile-section' >
      <h2 className='personal-title' >personal Details</h2>

      <div className="detail-box">
        <div className="personal-details">

      <div className="input-group">
        <label className='profile-text1'>First Name:</label>
        <input type="text" value={capitalizeFirstLetter(currentUser?.displayName)} />
      </div>

      <div className="input-group">
        <label className='profile-text2'>Last Name:</label>
        <input type="text"  />
       </div>

      <div className="input-group">
        <label className='profile-text3'>Email:</label>
        <input type="text" value={currentUser?.email} />
      </div>

      <div className="input-group">
        <label className='profile-text4'>Phone Number:</label>
        <input type="text" />
      </div>

        </div>
      </div>
    </div>
  )
}

export default ProfilePersonal