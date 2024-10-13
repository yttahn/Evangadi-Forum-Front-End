import React, { useRef, useContext, useState } from "react";
import axios from "../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import classes from "../Question/askQuestion.module.css";
import { AppState } from "../../App";
import Header from "../../component/Header/Header";

function AskQuestion() {
  const token = localStorage.getItem("token");
  const { users } = useContext(AppState);
  const user_id = users?.user_id; // Safely accessing user_id
  const username = users?.username;

  // State for error and success messages
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Refs for title and description
  const titleDom = useRef();
  const descDom = useRef();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const title = titleDom.current.value;
    const description = descDom.current.value;

    if (!title || !description) {
      setError("Please provide all required information");
      return;
    }

    //const question_id = uuidv4(); // Generate a new question ID

    try {
      const { data } = await axios.post(
        "/question/ask-question",
        {
          //question_id,
          //user_id,
          description,
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(data?.msg);
      setError(""); // Reset error message
      titleDom.current.value = ""; // Clear the title input
      descDom.current.value = ""; // Clear the description input
      navigate("/questions"); // Redirect to the homepage
    } catch (err) {
      setError(
        err?.response?.data?.msg || "An error occurred. Please try again."
      );
      setSuccessMessage(""); // Reset success message
      console.log(err.response.data);
    }
  }

  return (
    <div>
      <Header />
      <div className={classes.container}>
        <div className={classes.question_form_Instruction}>
          <h2>Steps to write a good Question</h2>
          <ul>
            <li>Summarize your problems in a one-line-title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <div className={classes.question_form_container}>
          <div className={classes.Ask_Public}>
            <h2>Ask Public Questions</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && (
              <p style={{ color: "rgba(0, 255, 0, 0.8)" }}>{successMessage}</p>
            )}
            <p className={classes.questionText}>
              Name: {username ? username : "No user ID available"}
              <br /> User ID: {user_id ? user_id : "No user ID available"}
            </p>
          </div>
          <form className={classes.question_form} onSubmit={handleSubmit}>
            <div className={classes.form_group}>
              <input type="text" ref={titleDom} placeholder="Title" />
            </div>
            <div className={classes.form_group}>
              <textarea
                ref={descDom}
                placeholder="Question Description ..."
              ></textarea>
            </div>
            <button className={classes.Your_Question} type="submit">
              Post Your Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;
