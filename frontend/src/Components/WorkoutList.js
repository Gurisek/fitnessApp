import Accordion from "react-bootstrap/Accordion";
import ThemeProvider from "react-bootstrap/ThemeProvider";

export default function WorkoutList({ backendData }) {
  return (
    <ThemeProvider breakpoints={["sm", "md", "lg", "xl", "xxl"]}>
      <Accordion>
        {backendData.map((workout, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{backendData.name}</Accordion.Header>
            <Accordion.Body>
              <h2>Exercises</h2>
              {backendData.exercises.map((exercise, idx) => (
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
