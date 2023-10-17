import Options from "./Options";
import NextBtn from "./NextBtn";
import Timer from "./Timer";
import { useProfile } from "../contexts/ProfileContext";

function Questions() {
  const { questions: question, index, numQuestionsLength } = useProfile();
  const questions = question[index];
  return (
    <div className="mx-auto py-8 px-16 rounded shadow-lg max-w-[65rem] bg-white">
      <h4 className="text-[2rem] pb-12">
        Question {index + 1} / {numQuestionsLength}: {questions.question.text}
      </h4>
      <Options question={questions} />
      <footer className="flex justify-between mt-12">
        <Timer />
        <NextBtn />
      </footer>
    </div>
  );
}

export default Questions;
