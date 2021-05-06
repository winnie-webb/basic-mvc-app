import React, { useState, useEffect } from "react";
import "./css/Analytics.css";
import { Bar, Line } from "react-chartjs-2";
function Analytics() {
  const username = localStorage.getItem("username");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/dashboard/${username}/exercises`)
      .then((res) => res.json())
      .then((res) => setExercises(res.exercises))
      .catch((err) => setExercises([]));
  }, [username]);

  const exercisesCopy = [...exercises];
  const completedExercises = exercisesCopy.filter(
    (exercise) => exercise.completed
  ).length;

  const currentDate = new Date();
  const missingExercises = exercisesCopy.filter((exercise) => {
    return new Date(exercise.date).getTime() <= currentDate.getTime();
  }).length;
  const weightData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Weight Tracker",
        data: [200, 190, 160, 164, 150, 130],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <aside className="analytics">
      <div className="analytics__wrapperTop">
        <div className="analytics__cardTop">
          <h2 className="analytics__cardTop__heading analytics__cardTop__headingCompleted">
            Completed
          </h2>
          <h3 className="analytics__cardTop__content">{completedExercises}</h3>
        </div>
        <div className="analytics__cardTop">
          <h2 className="analytics__cardTop__heading analytics__cardTop__headingMissing">
            Missing
          </h2>
          <h3 className="analytics__cardTop__content">{missingExercises}</h3>
        </div>
        <div className="analytics__cardTop">
          <h2 className="analytics__cardTop__heading analytics__cardTop__headingTotal">
            Total
          </h2>
          <h3 className="analytics__cardTop__content">{exercises.length}</h3>
        </div>
      </div>
      <div className="analytics__wrapperBottom">
        <div className="analytics__cardBottom">
          <Line data={weightData} />
        </div>
        <div className="analytics__cardBottom analytics__cardBottom2">
          <Line data={weightData} />
        </div>
      </div>
    </aside>
  );
}

export default Analytics;
