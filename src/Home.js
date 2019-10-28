import React, { useContext } from "react";
import UserContext from "./UserContext";

const Home = () => {
  const { loggedInUser, logout } = useContext(UserContext);
  return (
    <>
      <h1>Home</h1>
      {loggedInUser && (
        <p>
          Hi {loggedInUser.name} <button onClick={logout}>Logout</button>
        </p>
      )}
    </>
  );
};

export default Home;
