import React, { useRef, useState, useEffect } from "react";
import WeightTrackerGraph from "./WeightTrackerGraph";
import "./css/WeightTracker.css";
function WeightTracker() {
  const [chartData, setChartData] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch(`/dashboard/${username}/chartdata`)
      .then((res) => res.json())
      .then((res) => setChartData(res.chartData))
      .catch((res) => setChartData([]));
  }, [username]);
  const weightDataContent = {
    labels: [...chartData],
    datasets: [
      {
        label: "Weight Tracker",
        data: chartData,
        backgroundColor: ["#3B3B98"],
        borderColor: ["#EAB543"],
        borderWidth: 1,
      },
    ],
  };

  const weightEntryElement = useRef();

  async function saveWeightDataToDb(chartData) {
    const requestData = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ chartData }),
    };
    console.log(requestData);
    try {
      fetch(`/dashboard/${username}/chartdata`, requestData);
    } catch (err) {
      setChartData([]);
    }
  }
  async function handleWeightSubmition() {
    const weightEntry = Number(weightEntryElement.current.value);
    if (isNaN(weightEntry)) return;

    const newChartData = [...chartData];
    newChartData.push(weightEntry);
    setChartData(newChartData);
    weightEntryElement.current.value = "";
    await saveWeightDataToDb(newChartData);
  }
  return (
    <aside className="weighttracker">
      <div className="weighttracker__add">
        <div className="util-flex">
          <input
            ref={weightEntryElement}
            placeholder="Add weight entry"
            className="weighttracker__addEntry util-pillBtn"
          ></input>
          <span className="weight-unit">Kg</span>
        </div>
        <button
          onClick={handleWeightSubmition}
          className="add-new-entry util-pillBtn"
        >
          Submit
        </button>
      </div>
      <div className="graph-wrapper">
        <WeightTrackerGraph weightDataContent={weightDataContent} />
      </div>
    </aside>
  );
}

export default WeightTracker;
