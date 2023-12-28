import React, { useEffect, useState } from "react";
import { useUser } from '../components/UserContext';
import Layout from "../components/Layout";
import supabase from "./supabase-config";

export default function HomePage() {
  const { user, login, handleLogout } = useUser();
  const [userInfo, setUserInfo] = useState(null);

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
  }, [login]);

  const handleGitHubLogin = () => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/authorize?provider=github`;
    } catch (error) {
      console.error("Échec de la connexion GitHub:", error.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
       
        <button onClick={handleGitHubLogin} className="my-4">CONNECT WITH GitHub</button>
        <button onClick={handleLogout} className="my-4">SIGN OUT</button>
      </div>
    </Layout>
  );
}
