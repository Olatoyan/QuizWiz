function Options({ question, dispatch, answer, shuffledOptions }) {
  const hasAnswered = answer !== null;
  const optionLabels = ["A)", "B)", "C)", "D)", "E)", "F)"];
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
