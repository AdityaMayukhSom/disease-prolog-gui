import { ChangeEvent, useEffect, useState } from "react";

import Question from "./Question";
import Diseases from "./Diseases";
import {
  getDiseases,
  getInitialQuestions,
  getNextQuestions,
} from "../data/APICalls";

import "./App.css";

const f = (x: number) => (1 / 4) * (x * x - x);
const g = (x: number) => (1 / 2) * (x * x - 2 * x + 2);

enum Steps {
  INITIAL_INQUIRY,
  FIRST_DETAILED_INQUIRY,
  SECOND_DETAILED_INQUIRY,
  DISEASE_DIAGNOSIS,
}

function App() {
  const [step, setStep] = useState<Steps>(Steps.INITIAL_INQUIRY);
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<string[]>([]);
  const [alreadyAskedMask, setAlreadyAskedMask] = useState<bigint>(BigInt(0n));
  const [selectedMask, setSelectedMask] = useState<bigint>(BigInt(0n));
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [diseases, setDiseases] = useState<string[]>([]);

  const nextStep = async () => {
    setLoading(true);

    if (step === Steps.INITIAL_INQUIRY) {
      if (selectedSymptoms.length === 0) {
        alert("must select atleast one symptom to continue...");
      } else {
        const { next_questions, selected_mask, already_asked_mask } =
          await getNextQuestions(
            selectedSymptoms,
            selectedMask,
            alreadyAskedMask
          );

        if (next_questions.length === 0) {
          setStep(Steps.DISEASE_DIAGNOSIS);
          setDiseases([]);
          return;
        }

        setQuestions(next_questions);
        setSelectedMask(selected_mask);
        setAlreadyAskedMask(already_asked_mask);
        setStep(Steps.FIRST_DETAILED_INQUIRY);
      }
    } else if (step === Steps.FIRST_DETAILED_INQUIRY) {
      setStep(Steps.SECOND_DETAILED_INQUIRY);
    } else if (step === Steps.SECOND_DETAILED_INQUIRY) {
      const diseases = await getDiseases(
        selectedSymptoms,
        selectedMask,
        alreadyAskedMask
      );

      setDiseases(diseases);
      setStep(Steps.DISEASE_DIAGNOSIS);
    }

    setLoading(false);
  };

  const addOrRemoveSymptom = async (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedSymptoms.includes(e.target.value)) {
      setSelectedSymptoms((prev) =>
        prev.filter((symptom) => symptom !== e.target.value)
      );
    } else {
      setSelectedSymptoms((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    (async () => {
      const { initial_questions, selected_mask, already_asked_mask } =
        await getInitialQuestions();

      setQuestions(initial_questions);
      setSelectedMask(selected_mask);
      setAlreadyAskedMask(already_asked_mask);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <>
        <h1>disease expert system.</h1>
        <div className="card">Loading...</div>
      </>
    );
  }

  return (
    <>
      <h1>disease expert system.</h1>
      {step === 3 ? (
        <Diseases diseases={diseases} />
      ) : (
        questions.length && (
          <form className="card">
            {questions
              .slice(f(step) * questions.length, g(step) * questions.length)
              .map((question) => (
                <Question
                  key={question}
                  question={question}
                  addOrRemoveSymptom={addOrRemoveSymptom}
                />
              ))}
            <button type="button" onClick={nextStep}>
              Continue
            </button>
          </form>
        )
      )}
    </>
  );
}

export default App;
