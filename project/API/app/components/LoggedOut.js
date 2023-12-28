import React from 'react';
import { useUser } from './UserContext';

function LoggedOut({ onClickLogin }) {
  const { user } = useUser();

  return (
    <div className="text-2xl text-black font-bold">
      <center><p>Please log in</p></center>
    </div>
  );
}

export default LoggedOut;
//<button onClick={onClickLogin}>Login</button>