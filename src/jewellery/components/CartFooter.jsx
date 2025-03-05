import React from 'react'
import { banglesData } from '../data/bangles'

const CartFooter = () => {
  return (
    <div className='cartFooter' >
    {
        banglesData.map((item) => {
            return(
              <div className="cartFooter">
              <div className="cartPrice">
                  <h3>₹{item.price}</h3>
              </div>
              <div className="cartPlace">
              <button className='place-order' >Place Order</button>
              </div>
              </div>
            )
        })
    }
</div>
  )
}

export default CartFooter