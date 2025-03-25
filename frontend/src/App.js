import React, { useState, useEffect } from "react";

export default function App() {
  const [backednData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const training = backednData.training
    ? backednData.training.map((training, index) => <div key={index}>{training}</div>)
    : [];
  return <div>
    <h1>Training</h1>
    {training}
  </div>;
}
