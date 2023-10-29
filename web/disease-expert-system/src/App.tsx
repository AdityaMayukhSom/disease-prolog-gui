import { ChangeEvent, useEffect, useState } from "react";

import Question from "./Question";
import Diseases from "./Diseases";
import Loading from "./Loading";
import {
  getDiseases,
  getInitialQuestions,
  getNextQuestions,
} from "../data/APICalls";
import Disease from "./Disease";

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
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<string[][]>([]);
  const [alreadyAskedMask, setAlreadyAskedMask] = useState<bigint>(BigInt(0n));
  const [selectedMask, setSelectedMask] = useState<bigint>(BigInt(0n));
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);

  const addOrRemoveSymptom = async (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    if (selectedSymptoms.includes(e.target.value)) {
      setSelectedSymptoms((prev) =>
        prev.filter((symptom) => symptom !== e.target.value)
      );
    } else {
      setSelectedSymptoms((prev) => [...prev, e.target.value]);
    }
  };

  const renderInitialQuestions = async () => {
    const { initial_questions, selected_mask, already_asked_mask } =
      await getInitialQuestions();

    setQuestions(initial_questions);
    setSelectedMask(selected_mask);
    setAlreadyAskedMask(already_asked_mask);
    setLoading(false);
  };

  const nextStep = async () => {
    setLoading(true);

    if (step === Steps.INITIAL_INQUIRY) {
      if (selectedSymptoms.length === 0) {
        // alert("must select atleast one symptom to continue...");
        setError(true);
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
          setLoading(false);
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

  useEffect(() => {
    // setTimeout(() => {
    renderInitialQuestions();
    // }, 20000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="w-full flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold text-white py-4 mt-2 rounded-md shadow-lg text-center">
        Disease Prediction System
      </h1>
      {step === 3 ? (
        <Diseases diseases={diseases} />
      ) : (
        questions.length && (
          <>
            <form className=" w-full items-start  max-w-3xl py-5">
              <h1 className="text-2xl font-bold text-white mb-4">
                {
                  {
                    0: "Answer these questions to begin with -",
                    1: "Okay, so do you also have any on these symptomps too?",
                    2: "And lastly any of these?",
                  }[step]
                }
              </h1>
              {questions
                .slice(f(step) * questions.length, g(step) * questions.length)
                .map((question) => (
                  <Question
                    key={question[0]}
                    question={question}
                    addOrRemoveSymptom={addOrRemoveSymptom}
                  />
                ))}

              {error && (
                <h4 className=" text-red-400 text-sm py-3">
                  * You must select atleast one symptom to proceed further
                </h4>
              )}
              <button type="button" onClick={nextStep}>
                {step === Steps.SECOND_DETAILED_INQUIRY
                  ? "Find Disease"
                  : "Continue To Next Step"}
              </button>
            </form>
          </>
        )
      )}
    </section>
  );
}

export default App;
