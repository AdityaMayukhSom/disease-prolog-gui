import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";

const SERVER_URL = "http://localhost:8000";

function App() {
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [alreadyAskedMask, setAlreadyAskedMask] = useState<BigInt>(BigInt(0n));
  const [selectedMask, setSelectedMask] = useState<BigInt>(BigInt(0n));
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const getInitialQuestions = async () => {
    const resp = await fetch(SERVER_URL + "/initial-questions");
    const {
      initial_questions,
      already_asked_mask,
      selected_mask,
    }: {
      initial_questions: string[];
      already_asked_mask: BigInt;
      selected_mask: BigInt;
    } = await resp.json();
    setAlreadyAskedMask(already_asked_mask);
    setSelectedMask(selected_mask);
    setQuestions(initial_questions);
  };

  const getNextQuestions = async () => {
    const resp = await fetch(SERVER_URL + "/next-questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        already_asked_mask: alreadyAskedMask,
        already_selected_symptoms_mask: selectedMask,
        symptoms: selectedSymptoms,
      }),
    });
    const { next_questions, already_asked_mask, selected_mask } =
      await resp.json();

    if (next_questions.length === 0) {
      alert("dead.");
      return;
    }

    setAlreadyAskedMask(already_asked_mask);
    setSelectedMask(selected_mask);
    setQuestions(next_questions as string[]);
  };

  const nextStep = async () => {
    if (step === 0) {
      if (selectedSymptoms.length === 0) {
        alert("you're healthy mf.");
        return;
      }
      console.log(selectedSymptoms);
      await getNextQuestions();
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    }
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
    getInitialQuestions();
  }, []);

  useEffect(() => {
    console.log(alreadyAskedMask);
  }, [alreadyAskedMask]);

  return (
    <>
      <h1>disease expert system.</h1>
      {questions.length && (
        <div className="card">
          {step === 0 &&
            questions.map((q) => (
              <div key={q} className="q">
                <input
                  onChange={addOrRemoveSymptom}
                  type="checkbox"
                  value={q}
                />
                <label htmlFor="question">{q}</label>
              </div>
            ))}
          {step === 1 &&
            questions.slice(0, questions.length / 2).map((q) => (
              <div key={q} className="q">
                <input
                  onChange={addOrRemoveSymptom}
                  type="checkbox"
                  value={q}
                />
                <label htmlFor="question">{q}</label>
              </div>
            ))}
          {step === 2 &&
            questions.slice(questions.length / 2).map((q) => (
              <div key={q} className="q">
                <input
                  onChange={addOrRemoveSymptom}
                  type="checkbox"
                  value={q}
                />
                <label htmlFor="question">{q}</label>
              </div>
            ))}
          <button onClick={nextStep}>Continue</button>
        </div>
      )}
    </>
  );
}

export default App;
