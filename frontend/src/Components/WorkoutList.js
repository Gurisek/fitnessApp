import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {
  PersonWalking,
  Clock,
  Trash,
  PencilSquare,
} from "react-bootstrap-icons";
import { useState } from "react";
import WorkoutDetail from "./Workout.detail";
import { useNavigate } from "react-router-dom";

export default function WorkoutList({ workouts }) {
  const [show, setShow] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const navigate = useNavigate();

  const handleDelete =  (id) => {
    fetch("http://localhost:5001/workout/" + id, {
      method: "DELETE"
    }).then(() => {
      alert("Trénink byl úspěšně smazán");
      window.location.reload();
    });

  }

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-5">Seznam tréninků </h1>
        <div className="d-flex flex-wrap justify-content-center">
          {workouts.length > 0 ? (
            workouts.map((workout, index) => (
              <Card
                className="card-custom-bg m-3 text-truncate"
                key={index}
                style={{
                  width: "18rem",
                }}
              >
                <Card.Body>
                  <Card.Title>{workout.name}</Card.Title>
                  <Card.Text className="text-truncate">
                    {workout.description}
                  </Card.Text>
                  <Card.Text style={{ display: "flex", alignItems: "center" }}>
                    <PersonWalking style={{ marginRight: "0.5rem" }} />
                    {workout.exercises.length} exercises
                  </Card.Text>
                  {workout.createdAt === workout.updatedAt ? (
                    <Card.Text
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Clock style={{ marginRight: "0.5rem" }} />
                      Vytvořeno: {new Date(workout.createdAt).toLocaleString()}
                    </Card.Text>
                  ) : (
                    <Card.Text
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Clock style={{ marginRight: "0.5rem" }} />
                      Upraveno: {new Date(workout.updatedAt).toLocaleString()}
                    </Card.Text>
                  )}
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      variant="primary"
                      className="button-custom-bg"
                      onClick={() => {
                        setSelectedWorkout(workout);
                        setShow(true);
                      }}
                    >
                      Detail
                    </Button>
                    <div>
                      <Button onClick={() => handleDelete(workout._id)} variant="danger" className="m-2 p-2">
                        <Trash />
                      </Button>
                      <Button onClick={() => navigate(`/workout/edit/${workout._id}`)} variant="warning" className="p-2">
                        <PencilSquare />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>Nebyl nalezen žádný záznam tréninků</p>
          )}
        </div>
      </div>
      {selectedWorkout && (
        <WorkoutDetail
          show={show}
          onHide={() => setShow(false)}
          workout={selectedWorkout}
        />
      )}
    </>
  );
}
