import { useEffect, useState } from "react";

import { useProfile } from "../contexts/ProfileContext";

function Options({ question }) {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const { dispatch, answer } = useProfile();
  const hasAnswered = answer !== null;
  const optionLabels = ["A)", "B)", "C)", "D)", "E)", "F)"];

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
      question.correctAnswer,
      question.incorrectAnswers
    );
    setShuffledOptions(options);
  }, [question.correctAnswer, question.incorrectAnswers]);

  return (
    <div className="flex flex-col gap-6 ">
      {shuffledOptions.map((option, i) => (
        <button
          key={option}
          disabled={hasAnswered}
          className={`${
            hasAnswered
              ? "cursor-not-allowed"
              : "cursor-pointer hover:bg-neutral-200"
          } ${
            hasAnswered
              ? question.correctAnswer === option
                ? "bg-green-500"
                : "bg-red-500"
              : ""
          } ${
            option === answer ? "translate-x-8" : ""
          } text-[1.8rem]  border-2 border-neutral-500 rounded-full text-left py-4 px-8 `}
          onClick={() => dispatch({ type: "newAnswer", payload: option })}
        >
          {optionLabels[i]} {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
