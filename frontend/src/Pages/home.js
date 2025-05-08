import Loading from "../Components/Loading";
import WorkoutList from "../Components/WorkoutList";
import useFetch from './../Hooks/useFetch';

export default function Home() {

    const {
        data: workoutsData,
        error,
        loading,
      } = useFetch("http://localhost:5001/workout/");

  return (
    <>
      {loading && <Loading className="text-center" />}
      {error && <p className="text-red-500">{`Chyba: ${error}`}</p>}
      {workoutsData && <WorkoutList workouts={workoutsData} />}
    </>
  );
}
