import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const avg = (((good * 1) + (neutral * 0) + (bad * -1)) / total)
  const positivos = (good * 100) / total

  return (
    <div>
      <h2>statistics</h2>
      good: {good}
      <br />neutral: {neutral}
      <br />bad: {bad}
      <br />all: {total}
      <br />average:  {avg}
      <br />positive: {positivos} %
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleClick = (tipo) => {
    if (tipo === 'good') {
      setGood(good + 1)
    } else if (tipo === 'neutral') {
      setNeutral(neutral + 1)
    } else if (tipo === 'bad') {
      setBad(bad + 1)
    }
    setAll(all + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => handleClick('good')}>good</button>
      <button onClick={() => handleClick('neutral')}>neutral</button>
      <button onClick={() => handleClick('bad')}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App