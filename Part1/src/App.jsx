import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positiv, setPositiv] = useState(0)

  const handleGood = () => {
    const updateGood = good + 1
    setGood(updateGood)
    const updateAll = all + 1
    setAll(updateAll)
    const updateAvg = (((updateGood * 1) + (neutral * 0) + (bad * -1)) / updateAll)
    setAvg(updateAvg)
    setPositiv((updateGood * 100) / updateAll)
  }

  const handleNeutral = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
    const updateAll = all + 1
    setAll(updateAll)
    const updateAvg = (((good * 1) + (updateNeutral * 0) + (bad * -1)) / updateAll)
    setAvg(updateAvg)
    setPositiv((good * 100) / updateAll)
  }

  const handleBad = () => {
    const updateBad = bad + 1
    setBad(updateBad)
    const updateAll = all + 1
    setAll(updateAll)
    const updateAvg = (((good * 1) + (neutral * 0) + (updateBad * -1)) / updateAll)
    setAvg(updateAvg)
    setPositiv((good * 100) / updateAll)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h2>statistics</h2>
      good: {good}
      <br />neutral: {neutral}
      <br />bad: {bad}
      <br />all: {all}
      <br />average:  {avg}
      <br />positive: {positiv} %
    </div>
  )
}

export default App