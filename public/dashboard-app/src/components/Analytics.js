import React from "react";
import "./css/Analytics.css";
import { Bar, Line } from "react-chartjs-2";
function Analytics() {
  const weightData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
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

  const workoutDurationsData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Workout Durations",
        data: [20, 30, 20, 50, 25, 20],
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
          <h3 className="analytics__cardTop__content">10</h3>
        </div>
        <div className="analytics__cardTop">
          <h2 className="analytics__cardTop__heading analytics__cardTop__headingMissing">
            Missing
          </h2>
          <h3 className="analytics__cardTop__content">3</h3>
        </div>
        <div className="analytics__cardTop">
          <h2 className="analytics__cardTop__heading analytics__cardTop__headingTotal">
            Total
          </h2>
          <h3 className="analytics__cardTop__content">13</h3>
        </div>
      </div>
      <div className="analytics__wrapperBottom">
        <div className="analytics__cardBottom">
          <Bar data={workoutDurationsData} />
        </div>
        <div className="analytics__cardBottom analytics__cardBottom2">
          <Line data={weightData} />
        </div>
      </div>
    </aside>
  );
}

export default Analytics;
