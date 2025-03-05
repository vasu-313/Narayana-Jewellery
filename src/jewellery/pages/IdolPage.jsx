import React from 'react'
import { idolData } from '../data/idol'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const IdolPage = () => {

  const {addToCart} = useCart();

  const {toggleWishlistItem, wishlistItems} = useWishlist();
  
  return (

    <>
    <Navbar />

    <div className="pageSection">
        {idolData.map((item)=>{
          const isInWishlist = wishlistItems.some(wishItem =>
            wishItem.id === item.id && wishItem.category === 'idol'
           )
            return(
                <div className="pageBox" key={item.id} >
                <div className="heartIcon">
                <i onClick={()=>toggleWishlistItem({...item, category: 'idol'})} 
                className={`bx ${isInWishlist ? 'bxs-heart' : 'bx-heart'}`}
                style = {{color: isInWishlist ? "red" : 'white', cursor: 'pointer',  }}
                ></i>
                </div>
                  <Link to={`/idol/${item.id}`} >
                <img className='pageImg' src={item.image} alt="" />
                  </Link>
                <div className="pageTitle">
                    <h4>{item.title}</h4>
                </div>
                <div className="pageDetails">
                <div className="icon">
                     <i onClick={()=>addToCart(item)} class='bx bx-cart'></i>
                     </div>
                <h4>₹{item.price}</h4>
                <h5>Weight:{item.weight}</h5>
                </div>
            </div>
            )
        })}
    </div>
    
    
    </>
    
  )
}

export default IdolPage