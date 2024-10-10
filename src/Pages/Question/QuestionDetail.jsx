import { AppState } from "../../App";
import axios from "../../axios/axiosConfig";
import React, { useContext, useEffect, useRef, useState } from "react";
import Classes from "./question.module.css";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";

const QuestionDetail = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { question_id } = useParams();
  const { users } = useContext(AppState);
  const [questions, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
   let params = useParams();
  const textDom = useRef();

  // Fetch a single question by question_id
  const fetchQuestion = async () => {
    try {
      const response = await axios.get(
        `/questions/single-questions/${params.question_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuestion(response?.data?.singleQuestions[0]); 
      // Adjusted to match API response structure
    } catch (error) {
      console.error(error?.response?.data || error.message);
    }
  };

  // Fetch answers for the specific question
  const fetchAnswers = async () => {
    try {
      const answerResponse = await axios.get(
        `/answers/all-answers/${questions?.question_id}`, 
        // Use question_id instead of tag
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnswers(answerResponse?.data?.answers);
    } catch (error) {
      console.error(error?.response?.data || error.message);
    }
  };

  // Post a new answer
  const postAnswer = async (e) => {
    e.preventDefault();
    const answerValue = textDom.current.value;

    if (!answerValue) {
      alert("Please fill the answer field.");
      return;
    }

    try {
      const response = await axios.post(
        `/answers/single-answer/${questions?.question_id}`,
        // Adjusted to match your API endpoint for posting answers
        {
          user_id: questions?.user_id, // Fetch user_id from the context
          question_id: questions?.question_id,
          answer: answerValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Answer added successfully.");
      setAnswers([...answers, response.data.newAnswer]); // Assuming response contains the new answer
    } catch (error) {
      console.error(error?.response?.data || error.message);
    }
  };

  // Fetch question on component load
  useEffect(() => {
    fetchQuestion();
  }, [question_id]);

  // Fetch answers when question_id changes
  useEffect(() => {
    if (questions?.question_id) {
      fetchAnswers();
    }
  }, [questions?.question_id]);

  return (
    <div>
      <Header />
      <section className={Classes.Question}>
        <h2>Question</h2>
        <h4>{questions?.question}</h4>
        <h6>{questions?.description}</h6>
        <hr />
        <h1>Answer From The Community</h1>
        <hr />
        {answers?.map((el, index) => (
          <div key={index}>
            <FaRegCircleUser size={80} />
            <h6>{el?.username}</h6>
            <div>
              <h6>{el.answer}</h6>
            </div>
          </div>
        ))}
        <div>
          <h2>Answer The Above Question</h2>
          <form onSubmit={postAnswer}>
            <textarea
              ref={textDom}
              placeholder="Your Answer ..."
              rows="4"
              cols="50"
            ></textarea>
            <br />
            <button type="submit">Post Your Answer</button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default QuestionDetail;
