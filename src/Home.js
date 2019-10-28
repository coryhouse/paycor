import React, { useContext } from "react";
import UserContext from "./UserContext";

const Home = () => {
  const loggedInUser = useContext(UserContext);
  return (
    <>
      <h1>Home</h1>
      {loggedInUser && <p>Hi {loggedInUser.name}</p>}
    </>
  );
};

export default Home;
