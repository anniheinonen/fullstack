import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h2>{props.course}</h2>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
        {props.part} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
          {props.parts.map(part => <Part key={part.id} part = {part.name} exercises = {part.exercises} id = {part.id} />)}
      </div>
    )
  }
  
  const Course = (props) => {
    return (
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
  }
  
  const Total = (props) => {
    return (
      <div>
        <p>
          Total of exercises {props.parts.reduce(function (acc, obj) { return acc + obj.exercises}, 0)}
        </p>
      </div>
    )
  }

  export default Course