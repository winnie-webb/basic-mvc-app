import React, { useState, useRef } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";

function WorkoutLogTask(props) {
  const {
    removeExercise,
    checkExerciseBox,
    updateExerciseName,
  } = props.functions;
  const { date, exerciseName, id, completed } = props.exercise;
  const [editing, setEditing] = useState(false);

  const inputNameElement = useRef();
  const isMissing = new Date(date).getTime() <= new Date().getTime();

  const className = !completed
    ? "workoutlog__exercise"
    : "workoutlog__exercise exercise-completed";
  return (
    <>
      <li key={id} className={className}>
        <div className="util-div">
          <input
            type="checkbox"
            onChange={() => checkExerciseBox(id)}
            checked={completed}
            className="workoutlog__exerciseCompleted"
          ></input>
          {!editing && (
            <p
              className={
                isMissing && !completed
                  ? "missing workoutlog__exerciseName"
                  : "workoutlog__exerciseName"
              }
            >
              {exerciseName} <span></span>
            </p>
          )}
          {editing && (
            <>
              <input
                ref={inputNameElement}
                className="workoutlog__exerciseEditor"
                type="text"
                placeholder="Edit exercise name"
              />
              <button
                onClick={() => {
                  const newName = inputNameElement.current.value;
                  if (!newName) return;
                  setEditing(!editing);
                  updateExerciseName(id, newName);
                }}
                className="workoutlog__exerciseEditor__submit util-pillBtn"
              >
                Update
              </button>
            </>
          )}
        </div>
        <div className="workoutlog__exerciseContent">
          <span className="workoutlog__exerciseDate">
            Due: {new Date(date).toLocaleDateString()} (
            {new Date(date).toLocaleTimeString()})
          </span>
        </div>

        <div className="workoutlog__exerciseIcons">
          <IconButton
            onClick={() => {
              removeExercise(id);
            }}
          >
            <DeleteIcon style={{ fontSize: "3rem", color: "#e74c3c" }} />
          </IconButton>

          <IconButton onClick={() => setEditing(!editing)}>
            <EditIcon style={{ fontSize: "3rem", color: "#2980b9" }} />
          </IconButton>
        </div>
      </li>
    </>
  );
}
export default WorkoutLogTask;
