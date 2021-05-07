import React, { useRef, useState } from "react";
import WeightTrackerGraph from "./WeightTrackerGraph";
import "./css/WeightTracker.css";
function WeightTracker() {
  const [chartData, setChartData] = useState([]);
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

  function handleWeightSubmition() {
    const weightEntry = Number(weightEntryElement.current.value);
    if (isNaN(weightEntry)) return;

    const newChartData = [...chartData];
    newChartData.push(weightEntry);
    setChartData(newChartData);
    weightEntryElement.current.value = "";
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
