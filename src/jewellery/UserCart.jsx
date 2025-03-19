import React from 'react'
import { useCart } from './context/CartContext'
import Navbar from './components/Navbar'
import CartFooter from './components/CartFooter'
import { Link } from 'react-router-dom'

const UserCart = () => {

    const {cartItems,  removeFromCart} = useCart()

  return (
    <>
    <Navbar />
        <div className='userCart-section' >
        <h1 className="CartTitle" >My Cart</h1>
    {cartItems.length === 0 ?
    (<p className='empty-cart' >Your Cart is Empty</p>):   
    <div>
        {cartItems.map((item)=>{
            return(
                <div className="cart-section">
                    <Link  to={`/${item.category}/${item.id}`} >
                    <div className="cart-img">
                        <img className='cart-img' src={item.image} alt="" />
                    </div>
                    </Link>
                    <div className="cart-details">
                        <div className="main-cart-title">
                        <h2>{item.title}</h2>
                        </div>

                        <div className="main-cart-details">
                            <h5>{item.weight} , pack of 1 ,  {item.purity}</h5>
                        </div>

                        <div className="delivery">
                            <h5>Delivery  in 3 days, <span className='cross-on-text' >₹100</span> FREE</h5>
                        </div>

                        <div className="star">
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star-half'><span className='rating' >4.5</span></i>
                        </div>

                        <div className="cart-item-cost">
                            <h2>₹{item.price}</h2>
                        </div>
                        <div className="place">
                            
                            <button onClick={() => removeFromCart(item)}  className='romove-cart'>Remove From Cart</button>
    
                        </div>
                        
                    </div>
                </div>
                
            )
        })}
        <CartFooter />
    </div>
    }
    </div>
    
    
    </>
  )
}

export default UserCart