import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwrite";

const ProfileContext = createContext();

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

function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        questions,
        loading,
        selectedCategory,
        selectedDifficulty,
        numQuestions,
        index,
        answer,
        points,
        secondsRemaining,
        status,
        handleFetchQuestions,
        chooseCategory,
        chooseDifficulty,
        chooseNumQuestions,
        handleLogout,
        maxPossiblePoints,
        dispatch,
        numQuestionsLength,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined)
    throw new Error("useProfile must be used within a ProfileProvider");
  return context;
}

export { ProfileProvider, useProfile };
