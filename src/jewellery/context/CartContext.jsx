import { createContext, useContext, useState, useEffect } from "react";
import { collection, doc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../components/Firebase";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Listen for auth state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  // Fetch cart items from Firestore when user changes
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }

    const cartRef = doc(db, "carts", user.uid);
    const unsubscribe = onSnapshot(cartRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setCartItems(docSnapshot.data().items || []);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const addToCart = async (item) => {
    if (!user) {
      alert("Please log in to add items to cart");
      navigate('/login')
      return;
    }

    try {
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, 
        { items: arrayUnion(item) },
        { merge: true }
      );
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const removeFromCart = async (item) => {
    if (!user) return;

    try {
      const cartRef = doc(db, "carts", user.uid);
      await updateDoc(cartRef, {
        items: arrayRemove(item)
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        totalPrice,
        loading,
        user
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);











































// this code is only add to cart and remove from cart not store the firestore 



// import {createContext, useContext ,useState, } from "react"


// const CartContext = createContext()

// export const Cartprovider = ({children}) =>{
//     const [ cartItems, setCartItems ] = useState([])


//     const totalPrice = cartItems.reduce((total, item) => total + item.price, 0)


//     const addToCart =(item)=>{
//         setCartItems([...cartItems, item])
//     }

// const removeFromCart =(item)=>{
//     setCartItems(cartItems.filter((apple)=> apple!== item))
// }


// return(
//     <CartContext.Provider value={{cartItems, addToCart, removeFromCart, totalPrice}} >
//         {children}
//     </CartContext.Provider>
// )

// }

// export const useCart =()=>{
//     return useContext(CartContext)
// }