import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { auth, db } from '../components/Firebase';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      {message}
      <button onClick={onClose} className="toast-close-btn">&times;</button>
    </div>
  );
};

const DeliveryAddress = () => {

  const { cartItems, totalPrice } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    pincode: '',
    city: '',
    landmark: '',
    locality: '',
    state: '',
    alternativeNumber: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const { state } = useLocation();

  // Get immediate product from state or use cart items
  const displayProducts = state?.immediateProduct 
  ? [state.immediateProduct] 
  : cartItems;

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const data = userDoc.data();
            setFormData({
              name: data.name || '',
              phoneNumber: data.phoneNumber || '',
              pincode: data.pincode || '',
              city: data.city || '',
              landmark: data.landmark || '',
              locality: data.locality || '',
              state: data.state || '',
              alternativeNumber: data.alternativeNumber || ''
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

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setToastMessage(null);
  
    try {
      if (!formData.name.trim() || !formData.phoneNumber.trim()) {
        throw new Error('Name and phone number are required');
      }
  
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      
      // Fixed the spread operator and added actual data
      await setDoc(userDocRef, {
        ...formData,  // Proper spread of formData state
        updatedAt: new Date()
      }, { merge: true });
  
      setToastMessage({ message: 'Address updated successfully!', type: 'success' });
    } catch (error) {
      setToastMessage({ message: error.message, type: 'error' });
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

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }


  const toastStyles = `
  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 4px;
    color: white;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  }

  .toast-success {
    background: #4CAF50;
  }

  .toast-error {
    background: #f44336;
  }

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  .toast-close-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0;
    margin-left: 15px;
  }
   `;   

  return (
    <>

      <style>{toastStyles}</style>
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}

    <Navbar />

    <div className="delivery-page">
      {displayProducts.map((item)=> (
              <div className="delivery-cart" key={item.id} >
              <div className="delivery-cart-box">
                <div className="delivery-img-box">
                  <img src={item.image} />
                </div>
                <div className="delivery-details">
                  <h3>{item.title}</h3>
                  <h6>{item.weight},purity:{item.purity}</h6>
                  <h5>Delivery  in 3 days, 
                    <span className='cross-on-text' >₹100</span> FREE</h5>

                    <div className="star">
                        <i className='bx bxs-star'></i>
                        <i className='bx bxs-star'></i>
                        <i className='bx bxs-star'></i>
                        <i className='bx bxs-star'></i>
                        <i className='bx bxs-star-half'><span className='rating' >4.5</span></i>
                        </div>
                        <h2>₹{item.price}</h2>
                </div>
              </div>
            </div>
      ))}

      <div className="delivery-box">
          <div className="delivery-heading">
            <h3 className='delivery-delivery' >Delivery Address</h3>
          </div>

          <form onSubmit={handleSubmit} className='delivery-form' >
            <div className="left-delivery">
              <div className="name-delivery">
                <input 
                type="text"
                placeholder='Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                />
              </div>

              <div className="name-delivery">
                <input
                type="text"
                name='pincode'
                value={formData.pincode}
                onChange={handleChange}
                required
                placeholder='Pincode' />
              </div>

              <div className="name-delivery">
                <input
                type="text"
                name='city'
                value={formData.city}
                onChange={handleChange}
                required
                placeholder='City/Town' />
              </div>

              <div className="name-delivery">
                <input 
                type="text" 
                name='landmark'
                value={formData.landmark}
                onChange={handleChange}
                required
                placeholder='Landmark' />
              </div>

            </div>

            <div className="right-delivery">
              <div className="number-delivery">
                <input 
                  type="tel"
                  placeholder='Phone Number'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                 />
              </div>

              <div className="number-delivery">
                <input 
                type="text"
                placeholder='Locality'
                name='locality'
                value={formData.locality}
                onChange={handleChange} 
                />
              </div>

              <div className="number-delivery">
                <input 
                type="text" 
                placeholder='State'
                name='state'
                value={formData.state}
                onChange={handleChange}
                />
              </div>

              <div className="number-delivery">
                <input 
                type="text" 
                placeholder='Alternative Number' 
                name='alternativeNumber'
                value={formData.alternativeNumber}
                onChange={handleChange}
                />
              </div>

            </div>

            {/* <div className="button-message-container" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: 'column', margin: '10px auto' }}>
              <button className='delivery-button' type='submit' disabled={updating}>
                {updating ? 'Updating...' : 'Update Address'}
              </button>
  
              <div className="message-column">
                {error && <p style={{ color: 'red', margin: '0' }}>{error}</p>}
                {success && <p style={{ color: 'green', margin: '0' }}>{success}</p>}
              </div>
            </div> */}
            <button className='delivery-button' type='submit' disabled={updating}>
              {updating ? 'Updating...' : 'Update Address'}
            </button>
          </form>
        </div>
    </div>


    {/* footer */}
    <div className='cartFooter'>
      <div className="cartPrice">
      <h3>
      Total Cost: {formatIndianCurrency(
        state?.immediateProduct 
          ? state.immediateProduct.price 
          : totalPrice
      )}
        </h3>
      </div>
      <div className="cartPlace">
        <button className='place-order'>
        {updating ? 'Saving...' : 'Pay Now'}
          </button>
      </div>
      
    </div>
    </>
  )
}

export default DeliveryAddress