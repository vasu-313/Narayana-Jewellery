import React from 'react'
import {idolData} from '../data/idol'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const Idol = () => {
    const {id} = useParams()

    const {addToCart, cartItems} = useCart()

    const item = idolData.find((item)=>item.id === id)

    const {toggleWishlistItem, wishlistItems} = useWishlist();


    const firstFiveImages = idolData.slice(0,4) 



  return (
    <div className='proSection' >
        {
            idolData.map((item) => {
            const isInWishlist = wishlistItems.some(wishItem =>
                 wishItem.id === item.id && wishItem.category === 'idol' )

                return(
                    <div className='imgBox' key={item.id} >
                        <div className="heartIcon">
                        <i onClick={()=>toggleWishlistItem({...item, category: 'idol'})} 
                        className={`bx ${isInWishlist ? 'bxs-heart' : 'bx-heart'}`}
                        style = {{color: isInWishlist ? "red" : 'white', cursor: 'pointer',  }}
                        ></i>
                        </div>
                        <Link to={`/idol/${item.id}`}>
                        <img className='proImage' src={item.image} alt="idol 1" />
                        </Link>
                        <div className="imgTitle">
                            <h4>{item.title}</h4>
                        </div>
                        <div className="imgDetails">
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

export default Idol