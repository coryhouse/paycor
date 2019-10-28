import React from "react";
import PropTypes from "prop-types";

const Home = props => (
  <>
    <h1>Home</h1>
    {props.loggedInUser && <p>Hi {props.loggedInUser.name}</p>}
  </>
);

Home.propTypes = {
  loggedInUser: PropTypes.object
};

export default Home;
