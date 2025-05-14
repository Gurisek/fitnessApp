import Loading from "../Components/Loading";
import WorkoutList from "../Components/WorkoutList";
import useFetch from "./../Hooks/useFetch";

export default function Home() {
  const {
    data: workoutsData,
    error,
    loading,
  } = useFetch("http://localhost:5001/workout/");

  return (
    <>
      {loading && (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <Loading />
        </div>
      )}
      {error && <p className="text-red-500">{`Chyba: ${error}`}</p>}
      {workoutsData && <WorkoutList workouts={workoutsData} />}
    </>
  );
}
