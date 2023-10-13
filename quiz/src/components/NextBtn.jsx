function NextBtn({ answer, index, numQuestionsLength, dispatch }) {
  if (answer === null) return null;

  console.log(index);
  console.log(numQuestionsLength);
  if (index < numQuestionsLength)
    return (
      <button
        className="text-[1.8rem]  border-2 border-neutral-500 rounded-full text-left py-3 px-12 justify-self-end"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestionsLength)
    return (
      <button
        className="text-[1.8rem]  border-2 border-green-600 bg-green-600 text-white rounded-full text-left py-3 px-12"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextBtn;
