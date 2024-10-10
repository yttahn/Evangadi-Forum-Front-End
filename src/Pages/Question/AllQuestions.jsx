import React, { useEffect, useState, useContext } from "react";
import axios from "../../axios/axiosConfig";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import classes from "./allQuestion.module.css";
import { AppState } from "../../../src/App";
import { Link } from "react-router-dom";
import Header from "../../component/Header/Header";

const AllQuestion = () => {
  const { users } = useContext(AppState); // Changed from user to users
  console.log(users);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("/question/all-questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestions(response.data.questions);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch questions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <p>{error}</p>;

  return (
    <>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
      <>
        <Header />
        <div className={classes.question_list_container}>
          <div className={classes.topBar}>
            <Link to="/QuestionDetail">
              <button className={classes.askQuestionBtn}>Ask Question</button>
            </Link>

            <div className={classes.welcomeMessage}>
              Welcome:{" "}
              <span className={classes.username}>{users?.username}</span>
            </div>
          </div>

          <div className={classes.searchBar}>
            <input
              type="text"
              placeholder="Search question"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={classes.questionItems}>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <div
                  className={classes.questionItem}
                  key={question.question_id}
                >
                  <div className={classes.user}>
                    <FaUserCircle className={classes.userIcon} />
                    <p className={classes.questionAuthor}>
                      {question.username}
                    </p>
                  </div>
                  <div className={classes.questionContent}>
                    <Link to={`/question/${question.questionid}`}>
                      <p className={classes.questionTitle}>{question.title}</p>
                    </Link>
                  </div>
                  <IoIosArrowForward className={classes.arrowIcon} />
                </div>
              ))
            ) : (
              <p>No questions found.</p>
            )}
          </div>
        </div>
      </>
      )}
    </>
  );
};

export default AllQuestion;
