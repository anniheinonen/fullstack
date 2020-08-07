import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Avg = (g, n, b) => {
  if (g+b+n === 0) {
    return 0
  }
  return (g-b)/(g+b+n)
}

const Pos = (g, n, b) => {
  if (g+b+n === 0) {
    return 0
  }
  return g/(g+b+n)*100
}

const StatisticLine = ({text, value}) => {
  return (
    
    <td>{text} {value}</td>
    
  )
}

const Statistics = ({g, n, b}) => {

  if (g+n+b === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <thead>
          <tr>
            <StatisticLine text="good" value ={g} />
          </tr>
        </thead>
        <thead>
          <tr>
            <StatisticLine text="neutral" value ={n} />
          </tr>
        </thead>
        <thead>
          <tr>
            <StatisticLine text="bad" value ={b} />
          </tr>
        </thead>
        <thead>
          <tr>
            <StatisticLine text="all" value ={g+n+b} />
          </tr>
        </thead>
        <thead>
          <tr>
            <StatisticLine text="average" value ={Avg(g, n, b)} />
          </tr>
        </thead>
        <thead>
          <tr>
            <td>positive {Pos(g, n, b)}%</td>
          </tr>
        </thead>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button
        handleClick={increaseGood}
        text='good'
      />
      <Button
        handleClick={increaseNeutral}
        text='neutral'
      />
      <Button
        handleClick={increaseBad}
        text='bad'
      />
      <Statistics g = {good} n = {neutral} b = {bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)