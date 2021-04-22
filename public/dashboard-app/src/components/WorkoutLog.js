import "date-fns";

import React, { useEffect, useRef, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import WorkoutLogTask from "./WorkoutLogTask";
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              minDate={new Date()}
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Select Date"
              value={exerciseDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              disablePast
              margin="normal"
              id="time-picker"
              label="Select Time"
              value={exerciseDate}
              minDate={new Date()}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
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
          return (
            <WorkoutLogTask
              date={new Date(exerciseDate).toDateString()}
              exercise={exercise}
              key={index}
              time={new Date(exerciseDate).toLocaleTimeString()}
            />
          );
        })}
      </ul>
    </aside>
  );
}

export default WorkoutLog;
