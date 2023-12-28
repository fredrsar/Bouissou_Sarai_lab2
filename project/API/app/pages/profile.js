import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useUser } from "../components/UserContext";

const UserProfile = () => {
  const { user } = useUser();
  const [githubData, setGithubData] = useState(null);

  useEffect(() => {
    // Si l'utilisateur est connecté et ses informations GitHub sont disponibles
    if (user && user.githubToken) {
      // Utilisez le token GitHub pour récupérer les informations de l'utilisateur depuis l'API GitHub
      fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${user.githubToken}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        setGithubData(data);
      })
      .catch(error => {
        console.error('Error fetching GitHub user data:', error);
      });
    }
  }, [user]);

  if (!user) {
    // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
    // Vous pouvez personnaliser cette logique selon vos besoins
    console.log(' pas conecteeeeee')
    return null;
  }

  return (
    <Layout>
      <div>
        <h1>User Profile</h1>
        <p>Username: {user.username}</p>
        {githubData && (
          <div>
            <p>GitHub ID: {githubData.id}</p>
            <p>GitHub Username: {githubData.login}</p>
            {/* Affichez d'autres informations de l'utilisateur GitHub ici */}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserProfile;
