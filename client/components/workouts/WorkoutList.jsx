import React, { useState } from "react";
import Workout from "./Workout.jsx";
import { Box, IconButton, Typography, Divider } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import useStyles from "../styles";

//populate each workout list tied to the user's saved lists

const WorkoutList = ({ workouts, fetchUser, user }) => {
  const classes = useStyles();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  // function to handle delete requests in user's workout list
  const deleteWorkout = (workout) => {
    // console.log('workout to be deleted', workout);
    axios
      .patch(`/user/workouts/delete`, { workout })
      .then(() => {
        fetchUser();
      })
      .catch((err) => {
        console.err("Failed to delete workout");
      });
  };
  const handleSelectWorkout = (workout) => {
    setSelectedWorkout(workout);
  };

  const deselectWorkout = (selectedWorkout) => {
    setSelectedWorkout(null);
  };

  return (
    <div>
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        display="flex"
        justifyContent="center"
        paddingTop="50px"
        paddingBottom="30px"
      >
        Saved Workout List
      </Typography>
      <br></br>
      <Divider />
      <Box
        className={classes.box}
        sx={{
          overflowX: "auto",
          // display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          padding: "10px",
          alignItems: "center",
        }}
      >
        {workouts.map((workout, index) => {
          return (
            <div className={classes.workoutSaved} key={index}>
              <IconButton onClick={() => deleteWorkout(workout)}>
                <DeleteForeverIcon fontSize="medium" />
              </IconButton>
              <Workout
                className={classes.workouts}
                workout={workout}
                key={index}
                onClick={() => handleSelectWorkout(workout)}
              />
            </div>
          );
        })}
      </Box>
      <Divider />
      <Box>
        {selectedWorkout ? (
          <div>
            <div
              style={{
                fontWeight: "bold",
                fontFamily: "Roboto",
                align: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Selected Workout
            </div>
            <br></br>
            <div className={classes.workoutSelected}>
              <IconButton
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  background: "#F1F1F1",
                  boxShadow: 2,
                }}
                onClick={() => deselectWorkout(selectedWorkout)}
              >
                <CloseIcon fontSize="medium" fontColor='red'/>
              </IconButton>
              {/* <br></br> */}
              <Workout
                className={classes.workoutSaved}
                workout={selectedWorkout}
              />
            </div>
          </div>
        ) : null}
      </Box>
    </div>
  );
};

export default WorkoutList;
