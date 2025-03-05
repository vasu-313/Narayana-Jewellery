import React from 'react'
import {mangalasutraData} from '../data/mangalasutra'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const Mangalasutra = () => {

    const {addToCart} = useCart();

    const {toggleWishlistItem, wishlistItems} = useWishlist();

  return (
            <div className='proSection' >
            {
                mangalasutraData.map((item) => {
                    const itemId = Number(item.id)
                    const isInWishlist = wishlistItems.some(wishItem =>
                        Number(wishItem.id) === itemId && wishItem.category === 'mangalasutra'
                      )
                    return(
                        <div className='imgBox' key={item.id}>
                            <div className="heartIcon">
                            <i onClick={()=>toggleWishlistItem({...item, category: 'mangalasutra'})} 
                            className={`bx ${isInWishlist ? 'bxs-heart' : 'bx-heart'}`}
                            style={{ 
                                color: 
                                  (itemId === 4) 
                                    ? (isInWishlist ? "red" : "white")
                                    : (isInWishlist ? "red" : "black"),
                                cursor: 'pointer'
                              }}
                            ></i>
                        </div>
                            <Link to={`/mangalasutra/${item.id}`} >
                            <img className='proImage' src={item.image} alt="bangles" />
                            </Link>
        
                            <div className="imgTitle">
                            <h4>{item.title}</h4>
                        </div>
                        <div className="braceletDetails">
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

export default Mangalasutra