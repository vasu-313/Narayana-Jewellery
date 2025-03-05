import React from 'react'
import { neckData } from '../data/neck'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'


const Necklace = () => {

    const {addToCart} = useCart();

    const {toggleWishlistItem, wishlistItems} = useWishlist();

  return (
     <div className='proSection' >
            {
                neckData.map((item) => {
                    const itemId = Number(item.id)
                    const isInWishlist = wishlistItems.some(wishItem =>
                        Number(wishItem.id) === itemId && wishItem.category === 'necklace'
                      )
                    return(
                        <div className='imgBox'key={item.id} >
                            <div className="heart-chain">
                            <i onClick={()=>toggleWishlistItem({...item, category: 'necklace'})} 
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
                            <Link to={`/necklace/${item.id}`} >
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

export default Necklace