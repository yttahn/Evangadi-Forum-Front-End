import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axiosConfig";
import { FaUserCircle } from "react-icons/fa";
import Classes from "./Answer.module.css";

const Answers = () => {
  const { question_id } = useParams(); // Extract questionid from the URL
  const [answers, setAnswers] = useState([]); // State to store answers
  const [newAnswer, setNewAnswer] = useState(""); // State for new answer input
  const [error, setError] = useState(""); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch answers when component mounts or when question_id changes
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch the auth token
        const response = await axios.get(`answers/all-answers${question_id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the headers
          },
        });
        setAnswers(response?.data?.answers); // Set answers in state
        setLoading(false); // Stop loading once answers are fetched
      } catch (error) {
        setError(
          error.response?.data?.message || "An unexpected error occurred."
        );
        setLoading(false); // Stop loading if an error occurs
      }
    };

    if (question_id) {
      fetchAnswers();
    }
  }, [question_id]);

  if (loading) return <p>Loading answers...</p>;

  return (
    <div>
      <h3>Answers From The Community</h3>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul className={Classes.answer_container}>
          {answers.map((answer) => (
            <li key={answer.answer_id}>
              <small>
                {" "}
                <FaUserCircle />
                <p>{answer.username}</p>
              </small>
              <p>{answer.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Answers;
