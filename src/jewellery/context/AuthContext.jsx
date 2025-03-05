import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../components/Firebase";



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {

                    setCurrentUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email
                    });
                
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    

    const logOut = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    };

    return(
        <AuthContext.Provider value={{ currentUser,logOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// custom hook to use Auth
export const useAuth = () => {
    return useContext(AuthContext);
};