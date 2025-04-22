import React, { useState, useEffect } from "react";
import "./tailwind.css";
import WorkoutList from "./Components/WorkoutList";
import Loading from "./Components/Loading";

export default function App() {
  // Oprava názvu stavu a výchozí hodnoty
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data); // Uložení dat do stavu
      })
      .catch((error) => {
        console.error("Chyba při načítání dat:", error);
      });
  }, []);

  return (
    <div>
      <h1>Seznam tréninků</h1>
      {/* Kontrola, zda jsou data načtena */}
      {backendData.length > 0 ? (
        <WorkoutList workoutData={backendData} />
      ) : (
        <Loading />
      )}
    </div>
  );
}
