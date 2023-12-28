// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../pages/supabase-config';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const queryString = window.location.hash.substring(1);
      const urlParams = new URLSearchParams(queryString);
      const accessToken = urlParams.get("access_token");

      if (accessToken) {
        await login();
      }
    };

    fetchData();
  }, []); 

  const login = async () => {
    try {
      
      const {
        data: { user},
      } = await supabase.auth.getUser()
      let metadata = user.user_metadata
      
      // Utilisez la fonction de mise à jour de l'état pour garantir la dernière valeur de l'état
      setUser((prevUserInfo) => ({
        ...prevUserInfo,
        ...user,
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération des informations de l'utilisateur:", error.message);
    }
  };

  const handleLogout = async () => {
    // Implémentez la logique de déconnexion ici si nécessaire
    // Par exemple, effacez les données utilisateur de l'état
  console.log("logedout");
  const { error } = await supabase.auth.signOut()
    
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
