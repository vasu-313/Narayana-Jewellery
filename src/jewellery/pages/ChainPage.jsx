import React from 'react'
import { chainData } from '../data/chain'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const ChainPage = () => {

    const {addToCart} = useCart();

    const {toggleWishlistItem, wishlistItems} = useWishlist();

  return (
    <>
    <Navbar />
    <div className="pageSection">
        {chainData.map((item)=> {
             const isInWishlist = wishlistItems.some(wishItem =>
                 wishItem.id === item.id && wishItem.category === 'chains'
                 )
            return(
                <div className="pageBox" key={item.id}>
                    <div className="heart-chain">
                    <i onClick={()=>toggleWishlistItem({...item, category: 'chains'})} 
                    className={`bx ${isInWishlist ? 'bxs-heart' : 'bx-heart'}`}
                    style = {{color: isInWishlist ? "red" : 'black', cursor: 'pointer',  }}
                    ></i>
                    </div>

                    <Link to={`/chains/${item.id}`} >
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

export default ChainPage