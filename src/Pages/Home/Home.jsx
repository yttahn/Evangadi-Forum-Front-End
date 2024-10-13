
import React, { useContext, useEffect } from "react";
import { AppState } from "../../App";
import classes from "./home.module.css";
import discussion from "../../image/discution.jpeg";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../component/Header/Header";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const { users } = useContext(AppState); // Access users from context
  const navigate = useNavigate(); // For navigating to other routes
  const location = useLocation(); // Get location object to check for state

  useEffect(() => {
    // Check if state contains a welcomeMessage flag and users object is populated
    if (location.state?.welcomeMessage && users?.username) {
      toast.success(`Welcome back, ${users.username}!`, {
        position: "top-right",
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Optionally clear the state after showing the toast
      window.history.replaceState({}, document.title);
    }
  }, [location.state, users?.username]); // Ensure that the toast only shows when username is available

  // Function to handle Join Now button click
  const handleJoinNowClick = () => {
    if (!users?.user_id || !users?.username) {
      console.error("User object is undefined or incomplete");
      navigate("/login"); // Redirect to login if user is not logged in
      return;
    }

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
          <button onClick={handleJoinNowClick} className={classes.join_now}>
            {users?.user_id && users?.username ? "Ask a Question" : "Join Now"}
          </button>
        </div>
        <div className={classes.image_content}>
          <img src={discussion} alt="student discussion" />
        </div>
      </div>

      {/* Toast Container for displaying notifications */}
      <ToastContainer />
    </div>
  );
}

export default Home;

