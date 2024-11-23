import React from "react";
import Backdrop from "../components/Backdrop";
import classes from "./SuccessPage.module.css";

export default function SuccessPage() {

  return (
    <div className={classes.page}>
    <Backdrop/>
      <div className={classes.container}>
        <h1>Attendance Marked Successfully!</h1>
        <p>Your attendance has been recorded. Thank you!</p>
      </div>
    </div>
  );
}
