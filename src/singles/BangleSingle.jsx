import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../jewellery/components/Navbar'
import { banglesData } from '../jewellery/data/bangles'
import { useCart } from '../jewellery/context/CartContext'
import { useWishlist } from '../jewellery/context/WishlistContext'

const BangleSingle = () => {
    const { id } = useParams()
    const { toggleWishlistItem, wishlistItems } = useWishlist()
    const { addToCart, cartItems } = useCart()
    const navigate = useNavigate();

    // 1. Check ID type in your data first
    const product = banglesData.find(item => 
        item.id.toString() === id // Compare as strings
    )

    // 2. Add error logging
    if (!product) {
        console.error('Product not found with ID:', id)
        console.log('Available IDs:', banglesData.map(item => item.id))
        return <div className="error">Product not found</div>
    }

    // 3. Verify wishlist check
    const isInWishlist = wishlistItems.some(wishItem =>
        wishItem.id.toString() === id && 
        wishItem.category === 'bangles'
    )

    // Combined handler for Buy Now
    const handleBuyNow = () => {
      // cartItems(product);
      navigate('/delivery', { state: { immediateProduct: product } });
  }

    return (
        <>
            <Navbar />
            <div className="ind-page">
        <div className="ind-image">
        <div className="single-heart">
          <i 
          onClick={() => toggleWishlistItem({...product, category: 'bangles'})}
          className={`bx ${isInWishlist ? 'bxs-heart' : 'bx-heart'}`}
          style={{ 
              color: isInWishlist ? "red" : 'white', 
              cursor: 'pointer'  
              }}
              ></i>
              </div>
          <img className='singleImg' src={product.image} alt="vasu" />
        </div>
        <div className="singleDetails">
            <h2 className='singleTitle' > {product.title} </h2>
            
            <div className="mainDetails">
              <h2 className='productDetails' >Product Details</h2>
              <div className="mainRow">
            <h2> Product: <span>{product.product}</span> </h2>
            <h2> Purity Peercentage: <span>{product.purity}</span> </h2>
            <h2> Item Weight: <span>{product.weight}</span> </h2>
            <h2> Wastage: <span>{product.wastage}</span> </h2>
            <h2> Making Cost: <span>${product.making}</span> </h2>
            <p className='description' >Resale value is based on present market price without include making cost</p>
              </div>
              <div className="totalCost">
                <div className="totalPrice">
                  <h2>TOTAL COST: ₹{product.price}</h2>
                </div>
                <div className="buy">
                  <button onClick={handleBuyNow} >
                    Buy Now
                    </button>
                <button onClick={()=>addToCart(product)} >Add To Cart</button>
                </div>
              </div>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default BangleSingle