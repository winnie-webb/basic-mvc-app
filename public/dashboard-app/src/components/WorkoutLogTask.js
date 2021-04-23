import React from "react";

function WorkoutLogTask(props) {
  const { date, exerciseName, time, id } = props.exercise;
  return (
    <li key={id} className="workoutlog__exercise" completed="false">
      {exerciseName}
      <div className="workoutlog__exerciseContent">
        <span className="workoutlog__exerciseDate">
          Due: {date} ({time})
        </span>
        <span className="workoutlog__exerciseDuration">Duration: 35mins</span>
      </div>
    </li>
  );
}
export default WorkoutLogTask;
