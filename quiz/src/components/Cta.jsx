import { Link } from "react-router-dom";

function Cta() {
  return (
    <div className="bg-primary text-white flex justify-between items-center py-20 px-32 mb-24">
      <h3 className="text-[2.5rem] font-semibold">
        Unlock Your Quiz Wizardry with QuizWiz!
      </h3>

      <div>
        <Link
          to="/login"
          className="block px-12 py-5 rounded-2xl font-semibold self-start text-[1.6rem] bg-cta-bg-color text-white uppercase "
        >
          Take a quiz now !
        </Link>
      </div>
    </div>
  );
}

export default Cta;
