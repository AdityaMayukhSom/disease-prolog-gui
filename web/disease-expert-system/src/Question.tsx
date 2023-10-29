import { ChangeEvent } from "react";

const Question = ({
  question,
  addOrRemoveSymptom,
}: {
  question: string[];
  addOrRemoveSymptom: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}) => {
  return (
    <div key={question[0]} className="py-2 flex items-center space-x-2">
      <input
        onChange={addOrRemoveSymptom}
        type="checkbox"
        value={question[0]}
        id={`question_${question[0]}`}
        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label
        htmlFor={`question_${question[0]}`}
        className=" select-none cursor-pointer"
      >
        {question[1]}
      </label>
    </div>
  );
};

export default Question;
