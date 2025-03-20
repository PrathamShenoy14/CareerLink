import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitCareerTest } from "../api/api"; // Function to send data to backend
import Layout from "../components/Layout";

const questions = {
  'A': [
      "I prefer working independently rather than in a team.",
      "I enjoy solving theoretical problems.",
      "I like having a structured schedule and clear expectations.",
      "I am comfortable making important decisions.",
      "I prefer concrete facts over abstract theories.",
      "I feel energized after interacting with many people.",
      "I enjoy analyzing data and finding patterns.",
      "I prefer following established procedures rather than creating new ones.",
      "I am motivated by opportunities to help others.",
      "I enjoy taking risks and trying new approaches.",
      "I prefer calm and orderly environments.",
      "I value practical skills over theoretical knowledge.",
      "I enjoy persuading others to see my point of view.",
      "I prefer tasks with concrete, visible results.",
      "I value creativity and innovation in my work.",
      "I am comfortable with frequent changes and new challenges.",
      "I prefer working with people rather than with information or things.",
      "I am comfortable with ambiguity and uncertainty.",
      "I prefer working with ideas rather than with concrete objects.",
      "I would enjoy being in a leadership position."
  ],
  'B': [
      "Financial security and stability",
      "Making a positive impact on society",
      "Recognition and prestige",
      "Independence and autonomy",
      "Building close relationships with colleagues",
      "Continuous learning and growth",
      "Having influence over important decisions",
      "Work-life balance",
      "Contributing to innovation and progress",
      "Finding meaning and purpose in work",
      "Advancement and career progression",
      "Working in a supportive, collaborative environment",
      "Clear structure and predictability",
      "Opportunities for creativity and self-expression",
      "Job security and stability"
  ],
  'C': [
      "Analyzing complex information",
      "Communicating clearly and persuasively",
      "Organizing and managing multiple tasks",
      "Solving technical problems",
      "Building and maintaining relationships",
      "Being creative and innovative",
      "Making effective decisions",
      "Paying attention to detail",
      "Leading and inspiring others",
      "Adapting to changing circumstances",
      "Working effectively in teams",
      "Resolving conflicts and disagreements",
      "Planning and prioritizing work",
      "Thinking critically and logically",
      "Understanding others' perspectives and feelings"
  ],
  'D': [
      "I prefer a fast-paced environment with variety.",
      "I prefer a private workspace rather than an open office.",
      "I prefer organizations that encourage innovation.",
      "I prefer a consistent schedule rather than variable hours.",
      "I enjoy competitive environments.",
      "I work best in collaborative settings.",
      "I prefer flat organizations over hierarchical ones.",
      "I would enjoy working remotely.",
      "I prefer environments with regular social interaction.",
      "I prefer clear policies and procedures."
  ]
}

const CareerTest = () => {
  const navigate = useNavigate();
  const categories = Object.keys(questions);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState({
    A: Array(questions.A.length).fill(null),
    B: Array(questions.B.length).fill(null),
    C: Array(questions.C.length).fill(null),
    D: Array(questions.D.length).fill(null),
  });

  const handleAnswerChange = (index, value) => {
    const category = categories[currentCategoryIndex];
    setAnswers((prev) => {
      const updatedAnswers = { ...prev };
      updatedAnswers[category][index] = value;
      return updatedAnswers;
    });
  };

  const nextCategory = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      window.scrollTo(0, 0); // Scroll to top
    } else {
      handleSubmit();
    }
  };
  
  const prevCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      window.scrollTo(0, 0); // Scroll to top
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting Answers:", answers);
    const result = await submitCareerTest(answers);
    if (result) {
      navigate("/results", { state: { result } });
    }
  };

  const allQuestionsAnswered = answers[categories[currentCategoryIndex]].every(
    (answer) => answer !== null
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8 pt-24 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Career Personality Test
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Answer honestly to get the best career recommendations.
        </p>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-3 mb-6">
          {categories.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentCategoryIndex
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>

        {questions[categories[currentCategoryIndex]].map((question, index) => (
          <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-md flex justify-center">
            <div className="flex-col items-center justify-between w-fit">
              <p className="text-lg font-medium text-gray-700 text-center">{question}</p>
              <div className="flex justify-center items-center mt-3 gap-6">
                {["1", "2", "3", "4", "5"].map((value, i) => (
                  <button
                    key={i}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-md border-2 ${
                      answers[categories[currentCategoryIndex]][index] ===
                      Number(value)
                        ? "bg-blue-600 text-white border-blue-600 scale-110"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-400"
                    }`}
                    onClick={() => handleAnswerChange(index, Number(value))}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Disagree</span>
                <span className="mr-2">Neutral</span>
                <span className="mr-1">Agree</span>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevCategory}
            className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 cursor-pointer ${
              currentCategoryIndex === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={currentCategoryIndex === 0}
          >
            Back
          </button>

          <div className="flex justify-center items-center gap-3 mb-6">
          {categories.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentCategoryIndex
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>

          <button
            onClick={nextCategory}
            disabled={!allQuestionsAnswered}
            className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 cursor-pointer ${
              allQuestionsAnswered
                ? "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentCategoryIndex < categories.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CareerTest;
