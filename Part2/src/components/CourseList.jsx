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
  
  
  export default CourseList