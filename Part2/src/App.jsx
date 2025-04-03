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
        name: 'Parte de prueba',
        exercises: 9,
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
    </div>
  )
}

export default App