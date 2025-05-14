import Loading from "../Components/Loading";
import ExerciseList from "../Components/ExerciseList";
import useFetch from "./../Hooks/useFetch";

export default function Exercises() {
  const {
    data: exerciseData,
    error,
    loading,
  } = useFetch("http://localhost:5001/exercise/");

  return (
    <>
      {loading && (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <Loading />
        </div>
      )}
      {error && <p className="text-red-500">{`Chyba: ${error}`}</p>}
      {exerciseData && <ExerciseList exercises={exerciseData} />}
    </>
  );
}
