import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axiosConfig";
import { AppState } from "../../../src/App";
import SubmitAnswer from "../../Pages/Answer/SubmitAnswer";
import { FaArrowCircleRight } from "react-icons/fa";
import classes from "./singleQuestion.module.css";

const SingleQuestion = () => {
  const { users } = useContext(AppState); // Get user from context
  const { question_id } = useParams(); // Get the question_id from URL
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/question/single-question/${question_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in Authorization header
            },
          }
        );

        setQuestion(response.data.question); // Set question data
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message || "An unexpected error occurred."
        );
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [question_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={classes.single_question_container}>
      <div className={classes.questionHeader}>
        <p>QUESTION</p>
      </div>
      <div>
        <div className={classes.uestion_title_wrapper}>
          <span className={classes.question_title}>
            <h2>
              {" "}
              {question.title}
            </h2>
          </span>
        </div>
        <div className={classes.question_desc}>
          <p className={classes.question_description}>{question.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
