import { ChangeEvent } from "react";

const Question = ({
  question,
  addOrRemoveSymptom,
}: {
  question: string[];
  addOrRemoveSymptom: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}) => {
  return (
    <div key={question[0]} className="py-1.5">
      <input
        onChange={addOrRemoveSymptom}
        type="checkbox"
        value={question[0]}
        className="mr-2 my-2"
        id={`question_${question[0]}`}
      />
      <label htmlFor={`question_${question[0]}`} className=" select-none">
        {question[1]}
      </label>
    </div>
  );
};

export default Question;
