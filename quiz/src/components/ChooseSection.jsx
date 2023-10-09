const chooses = [
  {
    title: "Engaging Quizzes",
    text: "Discover the captivating world of quizzes on QuizWiz! Our platform boasts an extensive collection of quizzes that span a diverse range of topics. Whether you're a music maestro, a film and TV fanatic, an arts and literature aficionado, or a history enthusiast, QuizWiz has a treasure trove of quizzes waiting for you.",
    img: "Choose-rafiki.svg",
    isChanged: false,
  },
  {
    title: "Track Your Progress",
    text: "Our intuitive progress monitoring system not only helps you gauge your current knowledge level but also celebrates your achievements. Visualize your journey as you conquer challenging quizzes and consistently improve your scores. It's like having a personal scoreboard for your learning adventure.",
    img: "Progress overview-amico.svg",
    isChanged: true,
  },
  {
    title: "User-Friendly Interface",
    text: "Whether you're a tech-savvy guru or just starting your online learning journey, QuizWiz welcomes you with open arms. No tech wizardry is required; all you need to do is sign up, and you're on your way to exploring the fascinating world of quizzes.",
    img: "Online test-pana.svg",
    isChanged: false,
  },
];

export default function ChooseSection() {
  return (
    <section className="px-28 mb-24">
      <h2 className="text-center text-secondary text-[3.3rem] font-semibold">
        Why Choose QuizWiz?
      </h2>
      <div>
        {chooses.map((box) => (
          <ChooseBox
            heading={box.title}
            text={box.text}
            imgSrc={box.img}
            isChanged={box.isChanged}
            key={box.title}
          />
        ))}
      </div>
    </section>
  );
}

function ChooseBox({ heading, text, imgSrc, isChanged }) {
  return (
    <div className="grid grid-cols-2 items-center justify-items-center ">
      <div className="flex flex-col gap-12">
        <h3 className="text-[2.7rem] font-bold">{heading}</h3>
        <p className="text-[1.8rem] leading-[1.8]">{text}</p>
      </div>
      <div
        className={`w-[40rem] ${
          isChanged ? "col-start-1 col-end-2 row-start-1" : ""
        }`}
      >
        <img src={imgSrc} alt="choose" />
      </div>
    </div>
  );
}
