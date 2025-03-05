// Heart icon component
import { useWishlist } from "./WishlistContext";

const HeartIcon = ({ item }) => {
  const { wishlistItems, toggleWishlistItem } = useWishlist();
  const isInWishlist = wishlistItems.some(wishlistItem => wishlistItem.id === item.id);

  return (
    <button 
      onClick={() => toggleWishlistItem(item)}
      style={{ color: isInWishlist ? "red" : "gray" }}
    >
      {isInWishlist ? "❤️" : "♡"}
    </button>
  );
};