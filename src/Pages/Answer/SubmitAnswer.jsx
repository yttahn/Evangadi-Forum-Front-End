import React, { useState } from "react";
import axios from "../../axios/axiosConfig";
import classes from "./SubmitAnswer.module.css"; // Corrected the import
import Answers from "../Answer/Answer"; // Assuming you have an Answers component

const SubmitAnswer = ({ answer_id }) => {
  // Receive question_id as prop
  const [answer, setAnswer] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Fetch the auth token
      const response = await axios.post(
        `/answers/edit-answer${answer_id}`,

        {
          answer_id,
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the headers
            "Content-Type": "application/json",
          },
        }
      );
      setResponseMessage(response.data.msg); // Display success message
    } catch (error) {
      setResponseMessage(
        error.response?.data?.msg || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className={classes.answer_container}>
      <Answers /> {/* Assuming you meant this component */}
      <form onSubmit={handleSubmit} className={classes.answer_form}>
        <textarea
          className={classes.answer_input}
          placeholder="Your answer ..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit" className={classes.submit_button}>
          Post Answer
        </button>
      </form>
      {responseMessage && (
        <p className={classes.response_message}>{responseMessage}</p>
      )}
    </div>
  );
};

export default SubmitAnswer;
