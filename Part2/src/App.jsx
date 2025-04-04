const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

const Course = ({ course }) => {
  console.log(course)
  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map(datos => <li key={datos.id}>{datos.name} {datos.exercises}</li>)}
      </ul>
      <TotalExercises parts = {course.parts} />
    </div> 
   )
}

const TotalExercises = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <b>total of {total} exercises total</b>
}

export default App