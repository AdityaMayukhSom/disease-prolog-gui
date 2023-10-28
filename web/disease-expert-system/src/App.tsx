import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";

const SERVER_URL = "http://localhost:8000";

const f = (x: number) => (1 / 4) * (x * x - x);
const g = (x: number) => (1 / 2) * (x * x - 2 * x + 2);

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

const Diseases = ({ diseases }: { diseases: string[] }) => {
  return diseases.length ? (
    <div>
      <h3>possible diseases:</h3>
      <ul className="card">
        {diseases.map((d) => (
          <li key={d} className="disease">
            {d}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h3>good luck. we don&apos;t know what&apos;s wrong with you.</h3>
  );
};

function App() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<string[]>([]);
  const [alreadyAskedMask, setAlreadyAskedMask] = useState<bigint>(BigInt(0n));
  const [selectedMask, setSelectedMask] = useState<bigint>(BigInt(0n));
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [diseases, setDiseases] = useState<string[]>([]);

  const getInitialQuestions = async () => {
    setLoading(true);
    const resp = await fetch(SERVER_URL + "/initial-questions");
    const {
      initial_questions,
      already_asked_mask,
      selected_mask,
    }: {
      initial_questions: string[];
      already_asked_mask: string;
      selected_mask: string;
    } = await resp.json();

    const numerical_already_asked_mask = BigInt(already_asked_mask);
    const numerical_selected_mask = BigInt(selected_mask);

    setAlreadyAskedMask(numerical_already_asked_mask);
    setSelectedMask(numerical_selected_mask);
    setQuestions(initial_questions);
    setLoading(false);
  };

  const getNextQuestions = async () => {
    setLoading(true);
    const resp = await fetch(SERVER_URL + "/next-questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symptoms: selectedSymptoms,
        already_asked_mask: alreadyAskedMask.toString(),
        already_selected_symptoms_mask: selectedMask.toString(),
      }),
    });

    const {
      next_questions,
      already_asked_mask,
      selected_mask,
    }: {
      next_questions: string[];
      already_asked_mask: string;
      selected_mask: string;
    } = await resp.json();

    if (next_questions.length === 0) {
      setStep(3);
      setDiseases([]);
      return;
    }

    const numerical_already_asked_mask = BigInt(already_asked_mask);
    const numerical_selected_mask = BigInt(selected_mask);

    setAlreadyAskedMask(numerical_already_asked_mask);
    setSelectedMask(numerical_selected_mask);
    setQuestions(next_questions as string[]);
    setLoading(false);
    setStep(1);
  };

  const getDiseases = async () => {
    setLoading(true);
    const resp = await fetch(SERVER_URL + "/matching-diseases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        already_asked_mask: alreadyAskedMask.toString(),
        symptoms: selectedSymptoms,
        already_selected_symptoms_mask: selectedMask.toString(),
      }),
    });

    const {
      diseases,
    }: {
      diseases: string[];
    } = await resp.json();

    console.log(diseases);
    setDiseases(diseases);
    setLoading(false);
    setStep(3);
  };

  const nextStep = async () => {
    if (step === 0) {
      if (selectedSymptoms.length === 0) {
        alert("you're healthy mf.");
        return;
      }
      await getNextQuestions();
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      await getDiseases();
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

  if (loading) {
    return (
      <>
        <h1>disease expert system.</h1>
        <div className="card">Loading...</div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <h1>disease expert system.</h1>
        <div className="card">Loading...</div>
      </>
    );
  }

  if (loading) {
    return <h1>fetching questions...</h1>;
  }

  return (
    <>
      <h1>disease expert system.</h1>
      {step === 3 ? (
        <Diseases diseases={diseases} />
      ) : (
        questions.length && (
          <div className="card">
            {questions
              .slice(f(step) * questions.length, g(step) * questions.length)
              .map((q) => (
                <Question
                  question={q}
                  addOrRemoveSymptom={addOrRemoveSymptom}
                />
              ))}
            <button onClick={nextStep}>Continue</button>
          </div>
        )
      )}
    </>
  );
}

export default App;
