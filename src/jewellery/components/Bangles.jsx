import React from 'react'
import {banglesData} from '../data/bangles'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const Bangles = () => {

    const {addToCart} = useCart();
    const { toggleWishlistItem, wishlistItems } = useWishlist();
  return (
    <div className='proSection' >
    {
        banglesData.map((item) => {
            const isInWishlist = wishlistItems.some(wishItem =>
                wishItem.id === item.id && wishItem.category === 'bangles' )
            return(
                <div className='imgBox' key={item.id} >
                    <div className="heartIcon">
                    <i onClick={()=>toggleWishlistItem({...item, category: 'bangles'})} 
                    className={`bx ${isInWishlist ? 'bxs-heart' : 'bx-heart'}`}
                    style = {{color: isInWishlist ? "red" : 'white', cursor: 'pointer',  }}
                    ></i>
                    </div>

                    <Link to={`/bangle/${item.id}`} >
                    <img className='proImage' src={item.image} alt="bangles" />
                    </Link>

                    <div className="imgTitle">
                    <h4>{item.title}</h4>
                </div>
                <div className="ringDetails">
                <div className="icon">
                <i onClick={()=>addToCart(item)} class='bx bx-cart'></i>
                </div>
                    <h4>₹{item.price}</h4>
                    <h5>Weight:{item.weight}</h5>
                </div>
                </div>
            )
        })
    }
</div>
  )
}

export default Bangles