import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../components/Firebase"; // Adjust your firebase config path
import { useNavigate } from "react-router-dom";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Authentication state listener
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  // Firestore wishlist sync
  useEffect(() => {
    if (!user) {
      setWishlistItems([]);
      return;
    }

    const wishlistRef = doc(db, "wishlists", user.uid);
    const unsubscribe = onSnapshot(wishlistRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setWishlistItems(docSnapshot.data().items || []);
      } else {
        // Create empty wishlist if doesn't exist
        setDoc(wishlistRef, { items: [] });
      }
    });

    return () => unsubscribe();
  }, [user]);

  const toggleWishlistItem = async (item) => {
    if (!user) {
      alert("Please log in to manage your wishlist");
      navigate('/login')
      return;
    }

    try {
      const wishlistRef = doc(db, "wishlists", user.uid);
      const exists = wishlistItems.some(prevItem => 
        prevItem.id === item.id && 
        prevItem.category === item.category
      );

      if (exists) {
        await updateDoc(wishlistRef, {
          items: arrayRemove(item)
        });
      } else {
        await updateDoc(wishlistRef, {
          items: arrayUnion(item)
        });
      }
    } catch (error) {
      console.error("Error toggling wishlist item:", error);
      alert("Error updating wishlist. Please try again.");
    }
  };

  // Memoize context value
  const value = useMemo(() => ({
    wishlistItems,
    toggleWishlistItem,
    loading,
    user
  }), [wishlistItems, loading, user]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};











































// import {createContext, useContext ,useMemo,useState, } from "react"


// const WishlistContext = createContext()

// export const WishlistProvider = ({children}) =>{
//     const [ wishlistItems, setWishlistItems ] = useState([])




//     const toggleWishlistItem = (item) => {
//         setWishlistItems(prevItems => {
//             // Check for both ID and category
//             const exists = prevItems.some(prevItem => 
//                 prevItem.id === item.id && 
//                 prevItem.category === item.category
//             )
            
//             return exists 
//                 ? prevItems.filter(prevItem => 
//                     !(prevItem.id === item.id && prevItem.category === item.category)
//                   )
//                 : [...prevItems, item]
//         })
//     }

//       // Memoize context value to prevent unnecessary re-renders
//     const value = useMemo(() => ({
//       wishlistItems,
//       toggleWishlistItem
//   }), [wishlistItems]);


// return(
//     <WishlistContext.Provider value={value} >
//         {children}
//     </WishlistContext.Provider>
// )

// }

// export const useWishlist = () => {
//     const context = useContext(WishlistContext);
//     if (!context) {
//       throw new Error('useWishlist must be used within a WishlistProvider');
//     }
//     return context;
//   };