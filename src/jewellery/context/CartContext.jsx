import {createContext, useContext ,useState, } from "react"


const CartContext = createContext()

export const Cartprovider = ({children}) =>{
    const [ cartItems, setCartItems ] = useState([])


    const addToCart =(item)=>{
        setCartItems([...cartItems, item])
    }

const removeFromCart =(item)=>{
    setCartItems(cartItems.filter((apple)=> apple!== item))
}


return(
    <CartContext.Provider value={{cartItems, addToCart, removeFromCart}} >
        {children}
    </CartContext.Provider>
)

}

export const useCart =()=>{
    return useContext(CartContext)
}