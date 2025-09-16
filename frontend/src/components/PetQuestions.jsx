import { useState } from "react";

const PetQuestions = ({ setQuery }) => {
  const row1 = [
    "🐶 How often should I walk my dog?",
  "🐱 Why is my cat not eating?",
  "🐾 Best food for puppies?",
  "🦜 How to train a parrot?",
  "🐢 Is my turtle sick?",
  "🐱 Cat is loosing hair?"

  ];

  const row2 = [
    "🐕 Tips for bathing my dog?",
  "🐇 How do I take care of a rabbit?",
  "🐠 Why is my fish tank cloudy?",
  "🐦 Should I cover my bird’s cage?",
  "🐎 How to keep a horse healthy?"
  ];

 
  return (
    <div className="pet-questions">
      {/* Row 1 → Left */}
      <div className="scroll-row row-left">
        {row1.map((q, i) => (
          <div
            key={i}
            className="question-card"
            onClick={() => setQuery(q)} // 🔥 fills input on click
          >
            {q}
          </div>
        ))}
      </div>

      {/* Row 2 → Right */}
      <div className="scroll-row row-right">
        {row2.map((q, i) => (
          <div
            key={i}
            className="question-card"
            onClick={() => setQuery(q)} // 🔥 same here
          >
            {q}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetQuestions;
