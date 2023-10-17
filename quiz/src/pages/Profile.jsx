import TriviaApp from "./Trivia";
import Welcome from "../components/Welcome";
import Questions from "../components/Questions";
import FinishedScreen from "../components/FinishedScreen";
import Spinner from "../components/Spinner";
import { useProfile } from "../contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { account } from "../appwrite/appwrite";

function Profile() {
  const { status } = useProfile();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const res = await account.get();
        setUserDetails(res);
        setLoading(false);
        if (!res) {
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
        navigate("/login");
      }
    }

    fetchUserDetails();
  }, [navigate]);

  if (loading) return <Spinner />;

  return (
    <div className="bg-bgColor min-h-screen pt-6">
      <Welcome userDetails={userDetails} />
      {status === "start" && <TriviaApp />}
      {status === "ready" && <Questions />}
      {status === "finished" && <FinishedScreen />}
    </div>
  );
}

export default Profile;
