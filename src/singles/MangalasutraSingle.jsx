import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../jewellery/components/Navbar'
import { mangalasutraData } from '../jewellery/data/mangalasutra'
import { useWishlist } from '../jewellery/context/WishlistContext'
import { useCart } from '../jewellery/context/CartContext'

const MangalasutraSingle = () => {

    const { id } = useParams()
    const { toggleWishlistItem, wishlistItems } = useWishlist()
    const { addToCart } = useCart()

    // 1. Check ID type in your data first
    const product = mangalasutraData.find(item => 
        item.id.toString() === id // Compare as strings
    )

    // 2. Add error logging
    if (!product) {
        console.error('Product not found with ID:', id)
        console.log('Available IDs:', mangalasutraData.map(item => item.id))
        return <div className="error">Product not found</div>
    }

    const itemId = Number(product.id)

    // 3. Verify wishlist check
    const isInWishlist = wishlistItems.some(wishItem =>
      Number(wishItem.id) === itemId &&
        wishItem.id.toString() === id && 
        wishItem.category === 'mangalasutra'
    )
  return (    
    <>
    <Navbar />

    <div className="ind-page">
        <div className="ind-image">
        <div className="single-heart">
          <i 
          onClick={() => toggleWishlistItem({...product, category: 'mangalasutra'})}
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
                  <button>Buy Now</button>
                <button onClick={()=>addToCart(product)} >Add To Cart</button>
                </div>
              </div>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default MangalasutraSingle