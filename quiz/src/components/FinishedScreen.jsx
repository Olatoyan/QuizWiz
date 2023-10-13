function FinishedScreen({ points, maxPossiblePoints, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  // 🥇
  if (percentage === 100) emoji = "🎖";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😊";
  if (percentage > 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <div className="max-w-[65rem] mx-auto p-6 text-center grid grid-cols-2 items-center">
      <img src="Completed-amico.svg" alt="completed" />
      <div>
        <p className="text-[2rem]">
          <span className="text-[2.2rem]">{emoji}</span> You scored{" "}
          <strong>{points}</strong> out of {maxPossiblePoints} (
          {Math.round(percentage)}%)
        </p>

        <button
          className="border-2 border-green-600 bg-green-600 text-white rounded-full text-left py-3 px-12 text-[2rem] mt-16"
          onClick={() => {
            dispatch({ type: "restart" });
          }}
        >
          Restart quiz
        </button>
      </div>
    </div>
  );
}

export default FinishedScreen;
