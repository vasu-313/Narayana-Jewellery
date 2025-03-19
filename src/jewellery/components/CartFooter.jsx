import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom';

const CartFooter = () => {
  const { totalPrice } = useCart();

  // Indian currency formatter
  const formatIndianCurrency = (amount) => {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch (error) {
      // Fallback for browsers that might not support en-IN
      return `₹${amount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
  };

  return (
    <div className='cartFooter'>
      <div className="cartPrice">
      <h3>Total Cost: {formatIndianCurrency(totalPrice)}</h3>
      </div>
      <Link to='/delivery' >
      <div className="cartPlace">
        <button className='place-order'>Place Order</button>
      </div>
      </Link>
    </div>
  )
}

export default CartFooter