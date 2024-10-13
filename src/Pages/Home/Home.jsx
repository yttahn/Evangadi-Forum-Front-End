import React, { useContext } from "react";
import { AppState } from "../../App";
import classes from "./home.module.css";
import discussion from "../../image/discution.jpeg";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header/Header";

function Home() {
  const { users } = useContext(AppState); // Access users from context
  const navigate = useNavigate(); // For navigating to other routes
  console.log("**")
  console.log(users)

  // Function to handle Join Now button click
  const handleJoinNowClick = () => {
        if (!users?.user_id || !users?.username) {
      console.error("User object is undefined or incomplete");
      navigate("/login"); // Redirect to login if user is not logged in
      return;
    }

    console.log("Current user state:", users.username);

    navigate("/askquestion"); // Navigate if user exists
  };

  return (
    <div>
      <Header />
      <div className={classes.forum_container}>
        <div className={classes.text_content}>
          <h1>Evangadi Forum</h1>
          <p>
            Welcome to Evangadi Forum—your premier tech community for global
            networking and learning. Join us to connect with peers, collaborate
            on projects, and enhance your professional growth. Explore the
            features that can elevate your tech journey today.
          </p>
          {/* Button changes text based on users state */}
          <button onClick={handleJoinNowClick} className={classes.join_now}>
            {users?.user_id && users?.username ? "Ask a Question" : "Join Now"}
          </button>
        </div>
        <div className={classes.image_content}>
          <img src={discussion} alt="student discussion" />
        </div>
        {/* Safely display the username if available */}
        {users?.username && <h2>Welcome, {users.username}!</h2>}
      </div>

    </div>
  );
}

export default Home;
