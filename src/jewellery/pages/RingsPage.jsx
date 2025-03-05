import React from 'react'
import { ringData } from '../data/ring'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const RingsPage = () => {

    const {addToCart} = useCart();

    const {toggleWishlistItem, wishlistItems} = useWishlist();

  return (
<>
<Navbar />
<div className="pageSection">
        {ringData.map((item)=>{
            const isInWishlist = wishlistItems.some(wishItem =>
                wishItem.id === item.id && wishItem.category === 'ring' 
            )
            return(
                <div className="pageBox" key={item.id}>
                    <div className="heartIcon">
                        <i onClick={()=>toggleWishlistItem({...item, category: 'ring'})} 
                        className={`bx ${isInWishlist ? 'bxs-heart' : 'bx-heart'}`}
                        style = {{color: isInWishlist ? "red" : 'white', cursor: 'pointer',  }}
                        ></i>
                        </div>
                    <Link to={`/ring/${item.id}`} >
                    <img className='pageImg' src={item.image} alt="" />
                    </Link>

                    <div className="imgTitle">
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

export default RingsPage