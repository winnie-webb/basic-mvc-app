import React from "react";

function WorkoutLogTask(props) {
  const { index } = props;
  const { date, exerciseName, time } = props.exercise;
  return (
    <li className="workoutlog__exercise" completed="false" key={index}>
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
