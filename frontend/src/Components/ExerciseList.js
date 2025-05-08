import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Trash, PencilSquare } from "react-bootstrap-icons";

export default function ExerciseList({ exercises }) {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Seznam cviků </h1>
      <div className="d-flex flex-wrap justify-content-center">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <Card
              className="card-custom-bg m-3"
              key={index}
              style={{
                width: "20rem",
              }}
            >
              <Card.Body>
                <Card.Title>{exercise.name}</Card.Title>
                <Card.Text>{exercise.description}</Card.Text>
              </Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  variant="danger"
                  className="d-flex d-flex align-items-center p-2 m-3"
                >
                  <Trash />
                  Odstranit
                </Button>
                <Button
                  variant="warning"
                  className="d-flex d-flex align-items-center p-2 m-3"
                >
                  <PencilSquare />
                  Upravit
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p>Nebyly nalezeny žádné cviky</p>
        )}
      </div>
    </div>
  );
}
