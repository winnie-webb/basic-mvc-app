import React from "react";

function WorkoutLogTask(props) {
  const { date, exercise, index, time } = props;
  return (
    <li className="workoutlog__exercise" completed="false" key={index}>
      {exercise}
      <div className="workoutlog__exerciseContent">
        <span className="workoutlog__exerciseDate">
          {" "}
          Due: {date} ({time})
        </span>
        <span className="workoutlog__exerciseDuration">Duration: 35mins</span>
      </div>
    </li>
  );
}
export default WorkoutLogTask;
