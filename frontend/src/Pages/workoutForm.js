import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import useFetch from "../Hooks/useFetch.js";

function WorkoutForm() {
  

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [workoutExercises, setWorkoutExercises] = useState([]);

  const { data, error } = useFetch("http://localhost:5001/exercise/");

  const handleAddExercise = () => {
    const newExercise = {
      exercise: selectedExercise,
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight),
    };
    setWorkoutExercises([...workoutExercises, newExercise]);
    // Resetování polí
    setSelectedExercise("");
    setSets("");
    setReps("");
    setWeight("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workoutData = {
      name,
      description,
      exercises: workoutExercises,
    };
    const response = await fetch("http://localhost:5001/workout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutData),
    })
      setName("");
      setDescription("");
      setWorkoutExercises([]);
    
    // Resetování formuláře
  };

  useEffect(() => {
    if (Array.isArray(data)) {
    setExercises(data);
  }}, [data]);

  return (
    <div className="container">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formWorkoutName">
        <Form.Label>Název tréninku</Form.Label>
        <Form.Control
          type="text"
          placeholder="Zadejte název"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formWorkoutDescription">
        <Form.Label>Popis tréninku</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <h4>Cviky</h4>
      {error && <p className="text-danger" >{error.message}</p>}
      {workoutExercises.map((exercise, index) => (
        <div key={index}>
          <p>{`Cvik ${index + 1}: ${exercise.exercise}, Sets: ${exercise.sets}, Reps: ${exercise.reps}, Weight: ${exercise.weight}`}</p>
        </div>
      ))}

      <Row>
        <Col>
          <Form.Group controlId="formExerciseSelect">
            <Form.Label>Cvik</Form.Label>
            <Form.Control
              as="select"
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
            >
              <option value="">Vyberte cvik</option>
              {Array.isArray(exercises) ? exercises.map((exercise) => (
                <option key={exercise._id} value={exercise._id}>
                  {exercise.name}
                </option>
              )) : (
                <option value="">Žádné cviky k dispozici</option>
              )}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formSets">
            <Form.Label>Sets</Form.Label>
            <Form.Control
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formReps">
            <Form.Label>Reps</Form.Label>
            <Form.Control
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formWeight">
            <Form.Label>Váha</Form.Label>
            <Form.Control
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Button
            variant="primary"
            onClick={handleAddExercise}
            className="mt-4"
          >
            Přidat cvik
          </Button>
        </Col>
      </Row>
      <Button variant="success" type="submit" className="mt-4">
        Uložit trénink
      </Button>
    </Form>
    </div>
  );
}

export default WorkoutForm;
