import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import WorkoutLogTask from "./WorkoutLogTask";
import WorkoutLogPickers from "./WorkoutLogPickers";
import "./css/WorkoutLog.css";
function WorkoutLog() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [exerciseDate, setExerciseDate] = useState(
    new Date().toLocaleDateString()
  );

  const exerciseInputElement = useRef();
  const exerciseWrapperElement = useRef();

  const username = localStorage.getItem("username");
  const currentDate = new Date().toDateString();

  useEffect(() => {
    fetch(`/dashboard/${username}/exercises`)
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((res) => {
        setExercises(res.exercises);
      })
      .catch((err) => {
        console.error(err);
        setExercises([]);
        setIsLoading(false);
      });
  }, [username]);

  async function removeExercise(id) {
    let newExercises = [...exercises];
    newExercises = newExercises.filter((exercise) => exercise.id !== id);
    await saveExercisesToDb(newExercises, "DELETE");
    setExercises(newExercises);
  }
  async function checkExerciseBox(id) {
    let newExercises = [...exercises];
    const exerciseToCheck = newExercises.find((exercise) => exercise.id === id);
    exerciseToCheck.completed = !exerciseToCheck.completed;
    console.log(newExercises);
    await saveExercisesToDb(newExercises, "PATCH");
    setExercises(newExercises);
  }
  async function updateExerciseName(id, newExerciseName) {
    const newExercises = [...exercises];
    const exerciseToUpdate = newExercises.find(
      (exercise) => exercise.id === id
    );
    exerciseToUpdate.exerciseName = newExerciseName;
    await saveExercisesToDb(newExercises, "PATCH");
    setExercises(newExercises);
  }
  async function saveExercisesToDb(exercises, method) {
    const requestData = {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ exercises }),
    };
    try {
      fetch(`/dashboard/${username}/exercises`, requestData);
    } catch (err) {
      console.error(err);
      setExercises([]);
    }
  }
  async function handleExerciseSubmition() {
    const exerciseInputContent = exerciseInputElement.current.value;
    const isExerciseInputValid =
      exerciseInputContent === "" || exerciseInputContent === null;

    if (isExerciseInputValid) return;

    const newExercises = [...exercises];
    console.log(exerciseDate);
    const exerciseField = {
      exerciseName: exerciseInputContent,
      completed: false,
      date: exerciseDate,
      id: uuid(),
    };
    newExercises.push(exerciseField);
    await saveExercisesToDb(newExercises, "PATCH");
    setExercises(newExercises);
    const exerciseWrapper = exerciseWrapperElement.current;
    exerciseWrapper.scrollTop = exerciseWrapper.scrollHeight;
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
            className="workoutlog__addInput workoutlog__input util-pillBtn"
            placeholder="Exercise Name"
          ></input>
          <WorkoutLogPickers
            exerciseDate={exerciseDate}
            handleDateChange={handleDateChange}
          />
        </div>

        {!isLoading && (
          <button
            onClick={handleExerciseSubmition}
            className="workoutlog__addSubmit util-pillBtn"
          >
            Add Exercise
          </button>
        )}
      </div>
      {isLoading && <div className="loader"></div>}

      <ul ref={exerciseWrapperElement} className="workoutlog__exerciseWrapper">
        {exercises.map((exercise) => {
          return (
            <WorkoutLogTask
              container={exerciseWrapperElement}
              functions={{
                removeExercise,
                checkExerciseBox,
                updateExerciseName,
              }}
              key={exercise.id}
              exercise={exercise}
            />
          );
        })}
      </ul>
    </aside>
  );
}

export default WorkoutLog;
