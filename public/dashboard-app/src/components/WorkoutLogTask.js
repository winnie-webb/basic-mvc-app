import React, { useState, useRef } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import { IconButton } from "@material-ui/core";

function WorkoutLogTask(props) {
  const { date, exerciseName, time, id } = props.exercise;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const modalBgElement = useRef();

  return (
    <>
      {showDeleteModal && <div ref={modalBgElement} className="modal-bg"></div>}

      <li key={id} className="workoutlog__exercise" completed="false">
        <div className="util">
          <input
            type="checkbox"
            className="workoutlog__exerciseCompleted"
          ></input>
          <span>{exerciseName}</span>
        </div>
        <div className="workoutlog__exerciseContent">
          <span className="workoutlog__exerciseDate">
            Due: {date} ({time})
          </span>
        </div>
        {showDeleteModal && (
          <div className="workoutlog__exerciseDeleteModal">
            <h3>Are you sure</h3>
            <div className="modal-optionsWrapper">
              <span className="modal-optionYes">Yes</span>
              <span
                onClick={() => setShowDeleteModal(!showDeleteModal)}
                className="modal-optionCancel"
              >
                Cancel
              </span>
            </div>
          </div>
        )}

        <div className="workoutlog__exerciseIcons">
          <IconButton
            onClick={() => {
              setShowDeleteModal(!showDeleteModal);
            }}
          >
            <DeleteIcon style={{ fontSize: "3rem", color: "#e74c3c" }} />
          </IconButton>

          <IconButton>
            <UpdateIcon style={{ fontSize: "3rem", color: "#27ae60" }} />
          </IconButton>
        </div>
      </li>
    </>
  );
}
export default WorkoutLogTask;
