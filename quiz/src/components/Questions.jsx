import { useEffect, useState } from "react";
import Options from "./Options";
import NextBtn from "./NextBtn";
import Timer from "./Timer";

function Questions({
  questions,
  index,
  answer,
  dispatch,
  numQuestionsLength,
  secondsRemaining,
}) {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  // console.log(questions);

  function shuffleOptions(correctAnswer, incorrectAnswers) {
    const options = [...incorrectAnswers, correctAnswer];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }

  useEffect(() => {
    const options = shuffleOptions(
      questions.correctAnswer,
      questions.incorrectAnswers
    );
    setShuffledOptions(options);
  }, [questions.correctAnswer, questions.incorrectAnswers]);

  // console.log(shuffledOptions);

  return (
    <div className="mx-auto py-8 px-16 rounded shadow-lg max-w-[65rem] bg-white">
      <h4 className="text-[2rem] pb-12">
        Question {index} / {numQuestionsLength}: {questions.question.text}
      </h4>
      <Options
        question={questions}
        dispatch={dispatch}
        answer={answer}
        shuffledOptions={shuffledOptions}
      />
      <footer className="flex justify-between mt-12">
        <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
        <NextBtn
          numQuestionsLength={numQuestionsLength}
          index={index}
          answer={answer}
          dispatch={dispatch}
        />
      </footer>
      {/* {questions.map((question) => (
        <li key={question.id} className="mb-2">
          <h3>Question:</h3> {question.question.text}
          <br />
          <strong>Category:</strong> {question.category}
          <br />
          <strong>Difficulty:</strong> {question.difficulty}
        </li>
      ))} */}
    </div>
  );
}

export default Questions;
