import React from 'react'
import Navbar from '../components/Navbar'
import { useWishlist } from '../context/WishlistContext'
import { Link,} from 'react-router-dom';
import { useCart } from '../context/CartContext';

const UserWishlist = () => {

    const {addToCart,} = useCart()


    const { wishlistItems, toggleWishlistItem } = useWishlist();


  return (
    <>
    < Navbar/>
        <div>
        <h1 className='CartTitle' >Wishlist</h1>
    {wishlistItems.length === 0 ?
    (<p className='empty-cart' >Your WishList is Empty</p>):
    <div className="pageSection" >
        {wishlistItems.map((item)=>{
            const isInWishlist = wishlistItems.some(wishItem => wishItem.id === item.id)

            return(
                <div className="pageBox" key={item.id} >
                <div className="heartIcon">
                <i onClick={()=>toggleWishlistItem(item)}
                 className='bx bxs-heart'
                 style = {{color: 'red' , cursor: 'pointer'}}
                 ></i>   
                 
                </div>
                    <Link to={`/${item.category}/${item.id}`} >
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
        }
    
    
    </div>
    
    </>
  )

}

export default UserWishlist