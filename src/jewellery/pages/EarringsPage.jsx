import React from 'react'
import { earringsData } from '../data/earrings'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const Earrings = () => {
    
    const {addToCart} = useCart();

    const {toggleWishlistItem, wishlistItems} = useWishlist();

  return (
    <>
    <Navbar />
    <div className="pageSection">
        {earringsData.map((item)=>{
            const itemId = Number(item.id)
            const isInWishlist = wishlistItems.some(wishItem =>
                Number(wishItem.id) === itemId && wishItem.category === 'earrings'
              )
            return(
                <div className="pageBox" key={item.id} >
                    <div className="heartIcon">
                            <i onClick={()=>toggleWishlistItem({...item, category: 'earrings'})} 
                            className={`bx ${isInWishlist ? 'bxs-heart' : 'bx-heart'}`}
                            style={{ 
                                color: 
                                  (itemId === 9 || itemId === 10) 
                                    ? (isInWishlist ? "red" : "white")
                                    : (isInWishlist ? "red" : "black"),
                                cursor: 'pointer'
                              }}
                            ></i>
                        </div>

                    <Link to={`/earrings/${item.id}`} >
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
                        <h5>Weight:{item.weight} </h5>
                    </div>
                </div>
            )
        })}
    </div>
    
    </>
  )
}

export default Earrings