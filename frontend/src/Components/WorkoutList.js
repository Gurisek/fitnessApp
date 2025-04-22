import Accordion from "react-bootstrap/Accordion";
import ThemeProvider from "react-bootstrap/ThemeProvider";

export default function WorkoutList({ workoutData }) {
  return (
    <ThemeProvider breakpoints={["sm", "md", "lg", "xl", "xxl"]}>
      <Accordion>
        {workoutData.map((workout, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{workout.workoutName}</Accordion.Header>
            <Accordion.Body>
              <h2>Exercises</h2>
              {workout.exercises.map((exercise, idx) => (
                <div key={idx}>
                  <h3>{exercise.name}</h3>
                  <p>Reps: {exercise.reps}</p>
                  <p>Sets: {exercise.sets}</p>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </ThemeProvider>
  );
}
