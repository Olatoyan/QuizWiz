import GridBox from "./GridBox";

export default function HeroSection() {
  return (
    <GridBox>
      <div className="flex flex-col gap-4">
        <h1 className="text-[6rem] text-primary font-bold max-w-[71.15rem]">
          QuizWiz - Where Learning Meets Fun!
        </h1>
        <p className="text-[2rem] leading-[1.2] max-w-[61.2rem]">
          Are you ready to supercharge your learning experience? QuizWiz is your
          go-to platform for interactive quizzes that make learning fun and
          effective. Whether you’re a student looking to ace your exams or a
          teacher wanting to engage your students, we’ve got you covered.
        </p>
        <button className="mt-16 px-12 py-5 rounded-2xl font-semibold self-start text-[1.6rem] bg-cta-bg-color text-white uppercase ">
          Take a quiz
        </button>
      </div>
      <div className="w-full">
        <img src="college students-amico.svg" alt="college students" />
      </div>
    </GridBox>
  );
}
