import React from 'react'
import {ringData} from '../data/ring'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const Rings = () => {

    const {addToCart} = useCart();

    const { toggleWishlistItem, wishlistItems } = useWishlist();

    const firstFiveImages = ringData.slice(0,4)
  return (
       <div className='proSection' >
            {
                ringData.map((item) => {
                    const isInWishlist = wishlistItems.some(wishItem =>
                        wishItem.id === item.id && wishItem.category === 'ring' 
                    )
                    return(
                        <div className='imgBox' key={item.id} >
                            <div className="heartIcon">
                            <i onClick={()=>toggleWishlistItem({...item, category: 'ring'})} 
                            className={`bx ${isInWishlist ? 'bxs-heart' : 'bx-heart'}`}
                            style = {{color: isInWishlist ? "red" : 'white', cursor: 'pointer',  }}
                            ></i>
                            </div>

                            <Link to={`/ring/${item.id}`} >
                            <img className='proImage' src={item.image} alt="idol 1" />
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

export default Rings