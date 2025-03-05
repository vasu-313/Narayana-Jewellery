import {createContext, useContext ,useMemo,useState, } from "react"


const WishlistContext = createContext()

export const WishlistProvider = ({children}) =>{
    const [ wishlistItems, setWishlistItems ] = useState([])




    const toggleWishlistItem = (item) => {
        setWishlistItems(prevItems => {
            // Check for both ID and category
            const exists = prevItems.some(prevItem => 
                prevItem.id === item.id && 
                prevItem.category === item.category
            )
            
            return exists 
                ? prevItems.filter(prevItem => 
                    !(prevItem.id === item.id && prevItem.category === item.category)
                  )
                : [...prevItems, item]
        })
    }

      // Memoize context value to prevent unnecessary re-renders
    const value = useMemo(() => ({
      wishlistItems,
      toggleWishlistItem
  }), [wishlistItems]);


return(
    <WishlistContext.Provider value={value} >
        {children}
    </WishlistContext.Provider>
)

}

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
      throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
  };