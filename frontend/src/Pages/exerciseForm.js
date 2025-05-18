import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ExerciseForm() {
  const [exercise, setExercise] = useState({
    name: "",
    description: "",
  });
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    try {
      const response = await fetch("http://localhost:5001/exercise/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exercise),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Cvik byl úspěšně vytvořen!");
      setExercise({});
      navigate("/exercises");
    } catch (error) {
      console.error("Error creating exercise:", error);
    }
  };

  return (
    <div className="container mt-5 p-4 card-custom-bg">
      <h1 className="text-center text-2xl font-bold mb-4">Vytvořit cvik</h1>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group controlId="formExerciseName">
          <Form.Label>Exercise Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Název cviku"
            name="name"
            value={exercise.name}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Jméno cviku je povinné.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formExerciseDescription">
          <Form.Label>Exercise Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Popis cviku"
            name="description"
            value={exercise.description}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Popis cviku je povinný.
          </Form.Control.Feedback>
        </Form.Group>
        <button className="btn btn-primary mt-3" type="submit">
          Create Exercise
        </button>
      </Form>
    </div>
  );
}
