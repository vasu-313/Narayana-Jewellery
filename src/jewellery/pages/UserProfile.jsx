import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { FcBusinessman } from "react-icons/fc";
import { MdOutlinePerson } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import ProfilePersonal from "../components/ProfilePersonal";
import ProfileOrders from "../components/ProfileOrders";
import ProfileFavorite from "../components/ProfileFavorite";
import ProfileAddress from "../components/ProfileAddress";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/Firebase";

const capitalizeFirstLetter = (str) => {
  return str?.charAt(0).toUpperCase() + str?.slice(1)?.toLowerCase() || '';
}

const UserProfile = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const [userData, setUserData] = useState(null);

  // Fetch additional user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, [currentUser]);

  const getDisplayName = () => {
    return (
      userData?.name || // Check Firestore name first
      currentUser?.displayName || // Then auth display name
      currentUser?.email?.split('@')[0] // Finally email fallback
    );
  };



  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      alert(`Logout failed: ${error.message}`);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <ProfilePersonal userData={userData} />;
      case 'orders':
        return <ProfileOrders />;
      case 'favorites':
        return <ProfileFavorite />;
      case 'address':
        return <ProfileAddress />;
      default:
        return (
          <>
            <h2>Welcome</h2>
            <h3>{currentUser?.email}</h3>
          </>
        );
    }
  };

  return (
    <>
    <Navbar />
      <div className="profile-section">
        
        <div className="display-profile">
          <div className="profile">
            <div className="user-img">
              <FcBusinessman className="user-sub-img" />
            </div>
            <div className="user-account">
              <h2>          
              {capitalizeFirstLetter(getDisplayName())}
              </h2>
            </div>
            <div className="main-box">
              <div className="button-placeholder" onClick={() => setActiveSection('personal')}>
                <MdOutlinePerson className="profile-icon" />
                <button className="personal"><span className="text-personal">Personal data</span></button>
              </div>
              <div className="button-placeholder" onClick={() => setActiveSection('orders')}>
                <BsFillBoxSeamFill className="profile-icon" />
                <button className="personal"><span className="text-order">Orders</span></button>
              </div>
              <div className="button-placeholder" onClick={() => setActiveSection('favorites')}>
                <FaRegHeart className="profile-icon" />
                <button className="personal"><span className="text-favorite">Favorites</span></button>
              </div>
              <div className="button-placeholder" onClick={() => setActiveSection('address')}>
                <IoHome className="profile-icon" />
                <button className="personal"><span className="text-address">Address</span></button>
              </div>
              <div className="button-placeholder">
                <CiLogout className="profile-icon" />
                <button className="personal" onClick={handleLogout}><span className="text-logout">Logout</span></button>
              </div>
            </div>
          </div>
          <div className="profile-result">
            {renderSection()}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;