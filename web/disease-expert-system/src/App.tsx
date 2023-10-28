import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const SERVER_URL = "http://localhost:8080"

interface Question {
  question_id: number;
  question_string: string;
}

function App() {
  const [step, setStep] = useState(0)
  const [initQ, setInitQ] = useState<Question[]>([])

  const getInitialQuestions = async () => {
    const resp = await fetch(SERVER_URL + "/initial-questions")
    const { questions } = await resp.json()
    setInitQ(questions as Question[])
  }

  useEffect(() => {
    if (step === 0) {
      getInitialQuestions()
    } else if (step === 1) {
      // Get next set of questions
    }
  }, [step])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>disease expert system.</h1>
      {(step === 0 && initQ.length) && (
        <div className="card">
          {initQ.map(q => (
            <div key={q.question_id}>
              <input 
                type='checkbox' 
                value={q.question_id}
              />
              <label htmlFor="question">{q.question_string}</label>
            </div>
          ))}
          <button onClick={() => setStep(1)}>
            Continue
          </button>
        </div>
      )}
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
