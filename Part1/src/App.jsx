import { useState } from 'react'

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
      <Button onClick={() => handleClick("good")} text="Bueno" />
      <Button onClick={() => handleClick("neutral")} text="Neutral" />
      <Button onClick={() => handleClick("bad")} text="Malo" />

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Statistics = ({ good, neutral, bad }) => {

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        No feeedback given
      </div>
    )
  }

  const total = good + neutral + bad
  const avg = (((good * 1) + (neutral * 0) + (bad * -1)) / total)
  const positivos = (good * 100) / total

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="god" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={avg.toFixed(2)} />
          <StatisticLine text="positive" value={`${positivos.toFixed(2)} %`} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, value }) => (
  <>
    <tr>
      <td>{text}:</td>
      <td> {value}</td>
    </tr>
  </>
)


export default App