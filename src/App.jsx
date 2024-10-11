import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import axiosBase from "./axios/axiosConfig"; // Import axios configuration
import Home from "./Pages/Home/Home.jsx";
import AskQuestion from "./Pages/Question/AskQuestion.jsx";
import LoginPage from "./component/SignUp/LoginPage.jsx";
import RegisterPage from "./component/SignUp/RegisterPage.jsx";
import Header from "./component/Header/Header.jsx";
import Footer from "./component/Footer/Footer.jsx";
import QuestionDetail from "./Pages/Question/QuestionDetail.jsx";
import QuestionWithAnswers from "./Pages/Question/QuestionWithAnswers.jsx"
import Howitworks from "./component/Howitworks/Howitworks.jsx";
import ForgotPassword from "./Pages/LogIn/ForgotPassword.jsx";
import AllQuestions from "./Pages/Question/AllQuestions.jsx"

// Create a context for the application state (user, etc.)
export const AppState = createContext();

function App() {
  const [users, setUser] = useState(null); // Initialize users as null
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate(); // Navigation hook
	const token = localStorage.getItem("token");


  useEffect(() => {
    async function checkUser() {
      // const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        setLoading(false); // Set loading to false if no token found
        return;
      }
      try {
        const { data } = await axiosBase.get("/users/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({ username: data.username, user_id: data.userid }); // Store user data
        //console.log(users)
      } catch (error) {
        console.error(
          "User not authenticated:",
          error.response || error.message
        );
        navigate("/login"); // Redirect to login if an error occurs
      } finally {
        setLoading(false); // Stop loading after API response
      }
    }
    checkUser(); // Run checkUser on component mount
  }, [token]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while checking user
  }

  return (
    // Provide user state to the whole app via context
    <AppState.Provider value={{ users, setUser }}>
      <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/howitworks" element={<Howitworks />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protect the AskQuestion route; user must be logged in */}
        <Route
          path="/askquestion"
          element={users ? <AskQuestion /> : <LoginPage />}
        />
         <Route path="/questions" element={<AllQuestions />} />
        <Route path="/question/:question_id" element={<QuestionWithAnswers />} />
      </ Routes>
      </div>
    </AppState.Provider>
  );
}

export default App;
