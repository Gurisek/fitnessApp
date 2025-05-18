import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Col, Row, Alert, Table } from "react-bootstrap";
import useFetch from "../Hooks/useFetch.js";
import { Trash } from "react-bootstrap-icons";

function WorkoutUpdateForm() {
  const { id } = useParams(); // předpokládá se route /workout/update/:id
  const navigate = useNavigate();

  // Načtení existujícího tréninku
  const { data: workout, error: workoutError } = useFetch(
    `http://localhost:5001/workout/${id}`
  );
  const { data: exercises, error: exercisesError } = useFetch(
    "http://localhost:5001/exercise/"
  );

  // State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgTable, setErrorMsgTable] = useState("");

  // Předvyplnění dat po načtení
  useEffect(() => {
    if (workout) {
      setName(workout.name || "");
      setDescription(workout.description || "");
      setWorkoutExercises(
        (workout.exercises || []).map((ex) => ({
          ...ex,
          name: exercises?.find((e) => e._id === ex.exercise)?.name || "",
        }))
      );
    }
  }, [workout, exercises]);

  // Přidání cviku
  const handleAddExercise = () => {
    const isRepsOrWeightFilled = reps !== "" && weight !== "";
    const isTimeFilled = Number(minutes) > 0 || Number(seconds) > 0;

    const newExercise = {
      exercise: selectedExercise,
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight),
      duration: `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`,
      name: exercises?.find((ex) => ex._id === selectedExercise)?.name,
    };

    if (!selectedExercise) {
      setErrorMsg("Musíte vybrat cvik.");
      return;
    }
    if (!sets) {
      setErrorMsg("Musíte zadat počet sérií.");
      return;
    }
    if (showTimer && minutes === "" && seconds === "") {
      setErrorMsg("Musíte zadat čas.");
      return;
    }
    if (!isTimeFilled && !isRepsOrWeightFilled) {
      setErrorMsg("Musíte zadat čas, nebo počet opakování/váhu.");
      return;
    }

    setWorkoutExercises([...workoutExercises, newExercise]);
    setSelectedExercise("");
    setSets("");
    setReps("");
    setWeight("");
    setMinutes("");
    setSeconds("");
  };

  // Odeslání změn
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (workoutExercises.length === 0) {
      setErrorMsgTable("Musíte přidat alespoň jeden cvik.");
      return;
    }
    const workoutData = {
      name,
      description,
      exercises: workoutExercises.map(
        ({ exercise, sets, reps, weight, duration }) => ({
          exercise,
          sets,
          reps,
          weight,
          duration,
        })
      ),
    };
    setValidated(true);

    const response = await fetch(`http://localhost:5001/workout/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workoutData),
    });

    if (response.ok) {
      alert("Trénink byl úspěšně aktualizován.");
      navigate("/");
    }
  };

  return (
    <div className="container mt-5 p-4 card-custom-bg">
      <h2>Upravit trénink</h2>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group controlId="formWorkoutName">
          <Form.Label>Název tréninku</Form.Label>
          <Form.Control
            type="text"
            placeholder="Zadejte název"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Jméno tréninku je povinné.
          </Form.Control.Feedback>
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
        {workoutError && <p className="text-danger">{workoutError.message}</p>}
        {exercisesError && <p className="text-danger">{exercisesError.message}</p>}
        {errorMsgTable && (
          <Alert variant="danger" onClose={() => setErrorMsgTable("")} dismissible>
            {errorMsgTable}
          </Alert>
        )}
        <Table variant="dark" striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>čas</th>
              <th>Akce</th>
            </tr>
          </thead>
          <tbody>
            {workoutExercises.map((exercise, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{exercise.name}</td>
                <td>{exercise.sets}</td>
                <td>{exercise.reps ? exercise.reps : "x"}</td>
                <td>{exercise.weight ? exercise.weight : "x"}</td>
                <td>
                  {exercise.duration !== "00:00" ? exercise.duration : "x"}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      const updatedExercises = workoutExercises.filter(
                        (_, i) => i !== index
                      );
                      setWorkoutExercises(updatedExercises);
                    }}
                  >
                    <Trash size={15} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="formExerciseSelect">
              <Form.Label>Cvik</Form.Label>
              <Form.Control
                as="select"
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
              >
                <option value="">Vyberte cvik</option>
                {Array.isArray(exercises) ? (
                  exercises.map((exercise) => (
                    <option key={exercise._id} value={exercise._id}>
                      {exercise.name}
                    </option>
                  ))
                ) : (
                  <option value="">Žádné cviky k dispozici</option>
                )}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <Form.Group controlId="formSets">
              <Form.Label>Sets</Form.Label>
              <Form.Control
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
              />
            </Form.Group>
          </Col>
          {!showTimer ? (
            <>
              <Col xs={12} md={6} lg={2}>
                <Form.Group controlId="formReps">
                  <Form.Label>Reps</Form.Label>
                  <Form.Control
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6} lg={2}>
                <Form.Group controlId="formWeight">
                  <Form.Label>Váha</Form.Label>
                  <Form.Control
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </>
          ) : (
            <Col xs={12} md={6} lg={2}>
              <Form.Group controlId="formTime">
                <Form.Label>Čas</Form.Label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Form.Control
                    type="number"
                    min="0"
                    max="59"
                    placeholder="min"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    style={{ width: "70px" }}
                  />
                  <span>:</span>
                  <Form.Control
                    type="number"
                    min="0"
                    max="59"
                    placeholder="sek"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    style={{ width: "70px" }}
                  />
                </div>
              </Form.Group>
            </Col>
          )}
          {errorMsg && (
            <Alert variant="danger" onClose={() => setErrorMsg("")} dismissible>
              {errorMsg}
            </Alert>
          )}
          <Col>
            <Button
              variant="primary"
              onClick={handleAddExercise}
              className="mt-4 button-custom-bg"
            >
              Přidat cvik
            </Button>
          </Col>
        </Row>
        <Form.Check
          type="switch"
          id="timeSwitch"
          label="Vybrat čas pro cvik?"
          onChange={() => setShowTimer((prev) => !prev)}
        />
        <Button variant="success" type="submit" className="mt-4 ">
          Uložit změny
        </Button>
      </Form>
    </div>
  );
}

export default WorkoutUpdateForm;