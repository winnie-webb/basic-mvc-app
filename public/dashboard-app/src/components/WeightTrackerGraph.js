import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";

function WeightTrackerGraph({ weightDataContent }) {
  useEffect(() => {});
  return <Line data={weightDataContent} />;
}
export default WeightTrackerGraph;
