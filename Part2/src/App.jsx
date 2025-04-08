const App = () => {

  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <CourseList courses={course} />
}

const CourseList = ({ courses }) => {
  return (
    <div>
      <h2>Web development curriculum</h2>
      {courses.map((course) => {
        const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
        return (
          < div key={course.id} >
            <h3>{course.name}</h3>
            <ul>
              {course.parts.map((part) => (
                <li key={part.id}>{part.name} {part.exercises}</li>
              ))}
            </ul>
            <p><strong>total of {totalExercises} exercises</strong></p>
          </div>
        );
      })}
    </div>
  );
};


export default App