import React, { useEffect, useRef, useState } from "react";

import WorkoutLogTask from "./WorkoutLogTask";
import WorkoutLogPickers from "./WorkoutLogPickers";
import "./css/WorkoutLog.css";
function WorkoutLog() {
  const [exercises, setExercises] = useState([]);
  const [exerciseDate, setExerciseDate] = useState(
    new Date().toLocaleDateString()
  );

  const exerciseInputElement = useRef();

  const username = localStorage.getItem("username");
  const currentDate = new Date().toDateString();

  useEffect(() => {
    fetch(`http://localhost:4000/dashboard/${username}/exercises`)
      .then((res) => res.json())
      .then((res) => setExercises(res.exercises))
      .catch((err) => console.log(err));
  }, [username]);

  // function saveNewExerciseToDb(exercise) {
  //   fetch("/")
  // }
  function handleExerciseSubmition() {
    const exerciseInputContent = exerciseInputElement.current.value;
    const isExerciseInputValid =
      exerciseInputContent === "" || exerciseInputContent === null;

    if (isExerciseInputValid) return;

    const newExercises = [...exercises];
    const newExerciseDate = new Date(exerciseDate).toDateString();
    const newExerciseTime = new Date(exerciseDate).toTimeString();
    const exerciseField = {
      exerciseName: exerciseInputContent,
      date: newExerciseDate,
      time: newExerciseTime,
    };
    newExercises.push(exerciseField);

    setExercises(newExercises);
    console.log(exercises, newExercises);
  }
  function handleDateChange(date) {
    setExerciseDate(date);
  }

  return (
    <aside className="workoutlog">
      <h3 className="workoutlog__heading">
        Today is <span>{currentDate}</span>
      </h3>
      <div className="workoutlog__add">
        <div className="workoutlog__inputsWrapper">
          <input
            ref={exerciseInputElement}
            className="workoutlog__addInput workoutlog__input"
            placeholder="Exercise Name"
          ></input>
          <WorkoutLogPickers
            exerciseDate={exerciseDate}
            handleDateChange={handleDateChange}
          />
        </div>
        <button
          onClick={handleExerciseSubmition}
          className="workoutlog__addSubmit"
        >
          Add Exercise
        </button>
      </div>

      <ul className="workoutlog__exerciseWrapper">
        {exercises.map((exercise, index) => {
          return <WorkoutLogTask index={index} exercise={exercise} />;
        })}
      </ul>
    </aside>
  );
}

export default WorkoutLog;
