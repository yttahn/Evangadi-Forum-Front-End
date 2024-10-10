import React from "react";
import Answer from "../Answer/Answer";
import SingleQuestion from "./SingleQuestion";

const SingleQuestionWithAnswers = () => {
  return (
    <div>
      <SingleQuestion />
      <Answer />
    </div>
  );
};

export default SingleQuestionWithAnswers;
