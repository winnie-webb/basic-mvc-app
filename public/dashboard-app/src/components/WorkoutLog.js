import React, { useEffect, useRef, useState } from "react";
import WorkoutLogTask from "./WorkoutLogTask";
import "./css/WorkoutLog.css";
function WorkoutLog() {
  const [exercises, setExercises] = useState([]);
  const currentDate = new Date().toDateString();
  const exerciseInputElement = useRef();
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch(`http://localhost:4000/dashboard/${username}/exercises`)
      .then((res) => res.json())
      .then((res) => setExercises(res))
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
    newExercises.push(exerciseInputContent);

    setExercises(newExercises);
    console.log(exercises, newExercises);
  }

  return (
    <aside className="workoutlog">
      <h3 className="workoutlog__heading">
        Today is <span>{currentDate}</span>
      </h3>
      <div className="workoutlog__add">
        <input
          ref={exerciseInputElement}
          className="workoutlog__addInput"
          placeholder="Add Exercise"
        ></input>

        <button
          onClick={handleExerciseSubmition}
          className="workoutlog__addSubmit"
        >
          New Exercise
        </button>
      </div>
      <ul className="workoutlog__exerciseWrapper">
        {exercises.map((exercise, index) => {
          return (
            <WorkoutLogTask
              date={currentDate}
              exercise={exercise}
              key={index}
            />
          );
        })}
      </ul>
    </aside>
  );
}

export default WorkoutLog;
