import React from "react";
import Answer from "../Answer/Answer";
import SingleQuestion from "./SingleQuestion";
import Header from "../../component/Header/Header";

const SingleQuestionWithAnswers = () => {
  return (
    <div>
      <Header />
      <SingleQuestion />
      <Answer />
    </div>
  );
};

export default SingleQuestionWithAnswers;
