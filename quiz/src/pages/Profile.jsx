import { useEffect, useReducer, useState } from "react";
import { account } from "../appwrite/appwrite";
import { useNavigate, Link } from "react-router-dom";
import TriviaApp from "./Trivia";
import Welcome from "../components/Welcome";
import Questions from "../components/Questions";
import FinishedScreen from "../components/FinishedScreen";

// case "finish":
//   return {
//     ...state,
//     status: "finished",

//   };
// case "restart":
//   return {
//     ...initialState,
//     status: "ready",
//   };
// case "tick":
//   return {
//     ...state,
//     secondsRemaining: state.secondsRemaining - 1,
//     status: state.secondsRemaining === 0 ? "finished" : state.status,
//   };

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  loading: false,
  error: false,
  selectedCategory: "science",
  selectedDifficulty: "easy",
  numQuestions: 10,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  status: "start",
};

const reducer = function (state, action) {
  switch (action.type) {
    case "setQuestions":
      return {
        ...state,
        questions: action.payload,
      };

    case "setCategory":
      return { ...state, selectedCategory: action.payload };
    case "setDifficulty":
      return { ...state, selectedDifficulty: action.payload };
    case "setNumQuestions":
      return {
        ...state,
        numQuestions: action.payload >= 0 ? action.payload : 10,
      };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "start":
      return {
        ...state,
        status: "ready",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctAnswer
            ? state.points + 10
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "restart":
      return {
        ...initialState,
        status: "start",
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    default:
      return state;
  }
};

function Profile() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    loading,
    selectedCategory,
    selectedDifficulty,
    numQuestions,
    index,
    answer,
    status,
    secondsRemaining,
    points,
  } = state;

  const handleFetchQuestions = async () => {
    // setLoading(true);
    dispatch({ type: "setLoading", payload: true });
    const apiUrl = `https://the-trivia-api.com/v2/questions?categories=${selectedCategory}&difficulties=${selectedDifficulty}&&limit=${numQuestions}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      dispatch({ type: "setQuestions", payload: data });
      dispatch({ type: "start" });
      dispatch({ type: "setLoading", payload: false });
    } catch (error) {
      console.error("Error fetching trivia questions:", error);
      dispatch({ type: "setLoading", payload: false });
    }
  };

  const numQuestionsLength = questions.length;
  const maxPossiblePoints = numQuestionsLength * 10;

  const chooseCategory = (category) => {
    dispatch({ type: "setCategory", payload: category });
  };

  const chooseDifficulty = (diff) => {
    dispatch({ type: "setDifficulty", payload: diff });
  };

  const chooseNumQuestions = (num) => {
    dispatch({ type: "setNumQuestions", payload: num });
  };

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState("");
  useEffect(() => {
    const getData = account.get();
    getData.then(
      (res) => {
        setUserDetails(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (!userDetails) {
  //     navigate("/login");
  //   }
  // }, [userDetails, navigate]);

  return (
    <div className="bg-bgColor min-h-screen pt-6">
      <Welcome userDetails={userDetails} onLogout={handleLogout} Link={Link} />
      {status === "start" && (
        <TriviaApp
          questions={questions}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          numQuestions={numQuestions}
          handleFetchQuestions={handleFetchQuestions}
          chooseCategory={chooseCategory}
          chooseDifficulty={chooseDifficulty}
          chooseNumQuestions={chooseNumQuestions}
          loading={loading}
          dispatch={dispatch}
        />
      )}
      {status === "ready" && (
        <Questions
          questions={questions.at(index)}
          index={index + 1}
          answer={answer}
          dispatch={dispatch}
          numQuestionsLength={numQuestionsLength}
          secondsRemaining={secondsRemaining}
        />
      )}

      {/* {status === "finished" && <p>Finished</p>} */}
      {status === "finished" && (
        <FinishedScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          dispatch={dispatch}
          handleFetchQuestions={handleFetchQuestions}
        />
      )}
    </div>
  );
}

export default Profile;
