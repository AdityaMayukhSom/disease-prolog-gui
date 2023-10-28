import { ChangeEvent } from "react";

const Question = ({
  question,
  addOrRemoveSymptom,
}: {
  question: string;
  addOrRemoveSymptom: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}) => {
  return (
    <div key={question} className="question">
      <input
        onChange={addOrRemoveSymptom}
        type="checkbox"
        value={question}
        id={`question_${question}`}
      />
      <label htmlFor={`question_${question}`}>{question}</label>
    </div>
  );
};

export default Question;
