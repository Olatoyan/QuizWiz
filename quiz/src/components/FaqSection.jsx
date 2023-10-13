import GridBox from "./GridBox";

const faqEntries = [
  {
    title: "How do I sign up for QuizWiz?",
    text: "Joining QuizWiz is a breeze! To get started, click on the 'Sign Up Now' button in the header. Fill in a few basic details, and voilà, you're all set to embark on your learning journey with QuizWiz.",
  },
  {
    title: "Are the quizzes free to take?",
    text: "Absolutely! All the quizzes on QuizWiz are 100% free. We firmly believe in making knowledge accessible to everyone.",
  },
  {
    title: "What types of quizzes does QuizWiz offer?",
    text: "QuizWiz offers a wide variety of quizzes across subjects like music, sports, film and TV, arts and literature, history, society and culture, science, geography, food and drink, and general knowledge. Whether you're a science enthusiast or a history buff, we have something for you.",
  },
  {
    title: "Can I track my progress and scores on QuizWiz?",
    text: "Indeed, you can! QuizWiz provides an intuitive progress tracking system. Monitor your performance, keep an eye on your scores, and witness your improvement over time. It's like having a personal scoreboard for your learning adventure.",
  },
  {
    title: "Are there any time limits for taking quizzes on QuizWiz?",
    text: "Yes, there is a time limit for quizzes on QuizWiz. You have 30 seconds per question to answer. Don't worry, it's enough time to test your knowledge and keep the quizzes engaging. So, stay focused and enjoy learning at your own pace!",
  },
];

export default function FaqSection() {
  return (
    <GridBox>
      <h2 className="col-span-full text-[3.3rem] text-secondary mb-28 font-semibold">
        Frequently Asked Questions
      </h2>
      <FaqItemBox />
      <FaqImgBox />
    </GridBox>
  );
}

function FaqItemBox() {
  return (
    <div className="flex flex-col gap-8 ">
      {faqEntries.map((question) => (
        <FaqItem
          heading={question.title}
          text={question.text}
          key={question.title}
        />
      ))}
    </div>
  );
}

function FaqItem({ heading, text }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[2rem] font-bold text-tertiary">{heading}</h3>
      <p className="text-[1.6rem] leading-[1.6]">{text}</p>
    </div>
  );
}

function FaqImgBox() {
  return (
    <div className="w-full">
      <img src="FAQs-cuate.svg" alt="faq" />
    </div>
  );
}
