import React from 'react'

const ProfileAddress = () => {
  return (
    <div>
        <div className="address-box">
          <div className="address-heading">
            <h3 className='profile-delivery' >Delivery Address</h3>
          </div>

          <form className='profile-form'>
            <div className="left-inputs">
              <div className="name-input">
                <input type="text" placeholder='Name' />
              </div>

              <div className="name-input">
                <input type="text" placeholder='Pincode' />
              </div>

              <div className="name-input">
                <input type="text" placeholder='City/Town' />
              </div>

              <div className="name-input">
                <input type="text" placeholder='Landmark' />
              </div>

            </div>

            <div className="right-input">
              <div className="number-input">
                <input type="text" placeholder='Phone Number' />
              </div>

              <div className="number-input">
                <input type="text" placeholder='Locality' />
              </div>

              <div className="number-input">
                <input type="text" placeholder='State' />
              </div>

              <div className="number-input">
                <input type="text" placeholder='Alternative Number' />
              </div>

            </div>

            <button className='address-button' >
              Update
            </button>
          </form>
        </div>
    </div>
  )
}

export default ProfileAddress