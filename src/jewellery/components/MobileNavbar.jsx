import React from 'react'
import { FaHeart, FaHome, FaList, FaShoppingCart, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';


const MobileNavbar = () => {

        const {currentUser} = useAuth();

        const {cartItems} = useCart()

  return (
    <div className="mobile-nav">
    <Link to="/" className="mobile-nav-item">
        <FaHome className="nav-icon" />
        <span>Home</span>
    </Link>
    
    <Link to={currentUser ? '/profile' : '/login'} className="mobile-nav-item">
        <FaUser className="nav-icon" />
        <span>Account</span>
    </Link>

    <Link to="/categories" className="mobile-nav-item">
        <FaList className="nav-icon" />
        <span>Category</span>
    </Link>

    <Link to="/wishlist" className="mobile-nav-item">
        <FaHeart className="nav-icon" />
        <span>Wishlist</span>
    </Link>

    <Link to="/cart" className="mobile-nav-item">
        <FaShoppingCart className="nav-icon" />
        <span>Cart</span>
        {cartItems.length > 0 && (
            <span className="mobile-cart-badge">{cartItems.length}</span>
        )}
    </Link>
</div>
  )
}

export default MobileNavbar