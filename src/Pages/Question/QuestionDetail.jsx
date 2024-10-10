import React, { useState } from "react";
import axios from "../../axios/axiosConfig";
import classes from "./question.module.css"; // Import styles
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handlePostQuestion = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Assume token is stored in localStorage
      if (!token) {
        setResponseMessage("You must be logged in to post a question.");
        return;
      }

      const response = await axios.post(
        "/question/askQuestion",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adding Authorization token if required
            "Content-Type": "application/json",
          },
        }
      );

      setResponseMessage(response.data.msg); // Show success message from API
      navigate("/all-questions");
    } catch (error) {
      setResponseMessage(
        error.response?.data?.msg || "An unexpected error occurred."
      );
      console.error(error); // Log the error for debugging
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Steps To Write A Good Question</h1>
      <hr className={classes.divider} />
      <ul className={classes.questionSteps}>
        <li>
          <FaArrowCircleRight className={classes.icon} />
          Summarize your problems in a one-line title.
        </li>
        <li>
          <FaArrowCircleRight className={classes.icon} />
          Describe your problem in more detail.
        </li>
        <li>
          <FaArrowCircleRight className={classes.icon} />
          Describe what you tried and what you expected to happen.
        </li>
        <li>
          <FaArrowCircleRight className={classes.icon} />
          Review your question and post it here.
        </li>
      </ul>

      <form onSubmit={handlePostQuestion} className={classes.form}>
        <div>
          <h2 className={classes.subtitle}>Post Your Question</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Question title"
            className={classes.input}
            required
          />
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Question detail ..."
            className={classes.textarea}
            required
          />
        </div>

        <button type="submit" className={classes.button}>
          Post Question
        </button>
      </form>

      {responseMessage && (
        <p className={classes.responseMessage}>{responseMessage}</p>
      )}
    </div>
  );
};

export default Questions;
