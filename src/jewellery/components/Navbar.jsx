import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { auth } from './Firebase';

// Capitalize first letter utility function
// const capitalizeFirstLetter = (str) => {
//     return str?.charAt(0).toUpperCase() + str?.slice(1)?.toLowerCase() || '';
// };


const Navbar = () => {

    const {cartItems} = useCart()

    const {currentUser} = useAuth();

  return (
    <>
    
        <div className="navSection">
        <div className="title">
            <h2>Narayana Jewellery</h2>
        </div>
        <div className="search">
            <input type="text" placeholder='Search For Jewellery' />
            <i class='bx bx-search' ></i>
        </div>
        <div className="user">

            {currentUser ? (<Link to='/profile' >
            <div className="user-detail">
            <i className='bx bx-user firstIcon'></i>Account</div>
            </Link>):
            (<Link to='/login' >
            <div className="user-detail"><i class='bx bx-user firstIcon'></i>Account</div>
            </Link>)}

            <Link to='/wishlist' >
            <div className="wishList"><i class='bx bx-heart secondIcon'></i>Wishlist</div>
            </Link>

            <Link to='/cart' >
            <div className="cart"><i class='bx bx-cart thirdIcon'></i>Cart
            <h4 className='cartNumber' >
            {cartItems.length}
            </h4>
            </div> 
            </Link>
            
            
        </div>
    </div>
    <div className="subMenu">
        <ul>
            <Link to='/b' >
            <li>Bangles</li>
            </Link> 

            <Link to='/br' >
            <li>Bracelets</li>
            </Link>

            <Link to='/c' >
            <li>Chains</li>
            </Link>

            <Link to='/e' >
            <li>Earrings</li>
            </Link>

            <Link to='/i' >
            <li>Idol</li>
            </Link>

            <Link to='/m' >
            <li>Mangalasutra</li>
            </Link>

            <Link to='/n' >
            <li>Necklace</li>
            </Link>


            <Link to='/r' >
            <li>Rings</li>
            </Link>
        </ul>
    </div>
    </>
  )
}

export default Navbar