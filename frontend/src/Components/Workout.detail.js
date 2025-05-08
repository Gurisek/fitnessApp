import Modal from "react-bootstrap/Modal";
import {
  NotebookText,
  DumbbellIcon,
  RotateCcw,
  Repeat2,
  Weight,
  Timer,
} from "lucide-react";

function WorkoutDetail({ show, onHide, workout }) {
  return (
    <Modal
      scrollable
      data-bs-theme="dark"
      show={show}
      onHide={onHide}
      dialogClassName="modal-80w"
    >
      <Modal.Header closeButton>
        <Modal.Title>{workout?.name || "Detail tréninku"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h6>Popis:</h6>
        <div className="m-1">
          {workout?.description || "Popis není k dispozici."}
        </div>

        {workout.exercises.length > 0 ? (
          <div className="d-flex flex-column gap-2">
            <h6>Seznam cviků:</h6>
            {workout.exercises.map((exercise, index) => (
              <div
                key={index}
                className="d-flex flex-column gap-1 border border-1 rounded p-2"
              >
                <p className="m-2 gap-2 h5 d-flex align-content-center">
                  <DumbbellIcon className="mt-2" size={16} />
                  {exercise.exercise.name}
                </p>
                <div className="d-flex align-items-start m-2 gap-2">
                  <NotebookText className="mt-1 flex-shrink-0" size={18} />
                  <div className="text-break">
                    {exercise.exercise.description}
                  </div>
                </div>
                <p className="m-2 gap-2 d-flex align-content-center">
                  <RotateCcw className="mt-1" size={15} />
                  {exercise.sets} série
                </p>
                {exercise.reps && exercise.weight ? (
                  <div className="d-flex justify-content-start gap-5 align-items-center m-1">
                    <p className=" d-flex">
                      <Repeat2 className="m-1" size={16} />
                      {exercise.reps} opakování
                    </p>
                    <p className="me-5 d-flex">
                      <Weight className="m-1" size={16} />
                      {exercise.weight} kg
                    </p>
                  </div>
                ) : exercise.duration ? (
                  <p className="m-1 d-flex">
                    <Timer className="m-1 me-2" size={16} /> {exercise.duration}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p>Žádné cviky nebyly přidány.</p>
        )}
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        {workout.createdAt === workout.updatedAt ? (
          <p className="m-0">
            <strong>Vytvořeno:</strong>{" "}
            {new Date(workout.createdAt).toLocaleString()}
          </p>
        ) : (
          <p className="m-0">
            <strong>Upraveno:</strong>{" "}
            {new Date(workout.updatedAt).toLocaleString()}
          </p>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default WorkoutDetail;
