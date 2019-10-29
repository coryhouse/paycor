import React, { useContext } from "react";
import UserContext from "./UserContext";
import useMouseCoordinates from "./useMouseCoordinates";

const Home = () => {
  const { loggedInUser, logout } = useContext(UserContext);
  const coords = useMouseCoordinates();
  return (
    <>
      <h1>Home</h1>
      Mouse coords: {coords[0] + " " + coords[1]}
      {loggedInUser && (
        <p>
          Hi {loggedInUser.name} <button onClick={logout}>Logout</button>
        </p>
      )}
    </>
  );
};

export default Home;
