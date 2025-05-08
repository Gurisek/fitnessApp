import Loading from "../Components/Loading";
import ExerciseList from "../Components/ExerciseList";
import useFetch from './../Hooks/useFetch';

export default function Exercises() {

  const {
    data: exerciseData,
    error,
    loading,
  } = useFetch("http://localhost:5001/exercise/");

  return (
    <>
      {loading && <Loading className="text-center" />}
      {error && <p className="text-red-500">{`Chyba: ${error}`}</p>}
      {exerciseData && <ExerciseList exercises={exerciseData} />}
    </>
  );
}
