// Header.js
import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { useRouter } from 'next/router';

function Header() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useUser(); // Utilisez le contexte utilisateur
  const router = useRouter();

  useEffect(() => {
    fetch('/api/profile') 
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Database does not respond...');
        }
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleRedirect = () => {
    router.push('/');
  };
console.log(" user: ",user);
  return (
    <div className="bg-blue-500 py-4">
      <h1 className="text-4xl text-white font-bold">{user ? `Welcome, ${user.user_metadata.preferred_username}!` : 'Public Profile'}</h1>

      {user ? (
        <div className="text-4xl text-white font-bold">
          {user? (
            `Account email: ${user.email}`
          ) : (
            'Loading profile...'
          )}
        </div>
        
      ) : (
        <div>
          <button onClick={handleRedirect} className="text-2xl text-white font-bold">
            Please log in
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
