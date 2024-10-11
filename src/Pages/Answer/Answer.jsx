import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axiosConfig";
import { FaUserCircle } from "react-icons/fa";
import Classes from "./Answer.module.css";
import { AppState } from "../../../src/App";

const AnswersAndSubmit = () => {
  const { question_id } = useParams();
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const { users } = useContext(AppState);
  const user_id = users?.user_id;

  const fetchAnswers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`answers/all-answers/${question_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnswers(response?.data?.answers);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (question_id) {
      fetchAnswers();
    }
  }, [question_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/answers/single-answer/`,
        {
          question_id,
          answer: newAnswer,
          user_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResponseMessage(response.data.msg);
      setNewAnswer(""); // Clear the input field
      fetchAnswers(); // Fetch answers again to update the list
    } catch (error) {
      setResponseMessage(error.response?.data?.msg || "An unexpected error occurred.");
    }
  };

  if (loading) return <p>Loading answers...</p>;

  return (
    <div>

      <div className={Classes.answer_container}>
 {responseMessage && (
          <p className={Classes.response_message}>{responseMessage}</p>
        )}

        <form onSubmit={handleSubmit} className={Classes.answer_form}>
          <textarea
            className={Classes.answer_input}
            placeholder="Your answer ..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button type="submit" className={Classes.submit_button}>
            Post Answer
          </button>
        </form>
             </div>

      <h3>Answers From The Community</h3>
      {error ? (
        <p>No Answer Could Be Found!</p>
      ) : (
        <ul className={Classes.answer_container}>
          {answers.map((answer) => (
            <li key={answer.answer_id}>
              <small>
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

export default AnswersAndSubmit;
