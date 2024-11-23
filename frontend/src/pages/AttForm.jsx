import { useEffect, useState } from "react";
import { useParams, Form } from "react-router-dom";
import { getCurrentLocation } from "./HomePage";
import Backdrop from "../components/Backdrop";
import classes from "./AttForm.module.css";

export default function AttForm() {
  const { formId } = useParams();
  const [accessGranted, setAccessGranted] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    async function checkLocationAccess() {
      try {
        setChecking(true);
        const location = await getCurrentLocation();

        const response = await fetch(
          `https://attendance-geoloc.onrender.com/verify-access/${formId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(location),
          }
        );

        const data = await response.json();

        setChecking(false);
        setAccessGranted(data.accessGranted);
      } catch (err) {
        setAccessGranted(false);

        setChecking(false);
      }
    }
    checkLocationAccess();
  }, [formId]);

  return (
    <div className={classes.page}>
    <Backdrop/>
      {checking ? (
        <p className={classes.message}>Checking your location...</p>
      ) : accessGranted ? (
        <div className={classes.container}>
          <h1>Attendance Form</h1>
          <p>Please fill out the form below to mark your attendance.</p>
          <Form method="post" className={classes.form}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="BITS ID"
                name="bits_id"
                required
              />
              <label for="floatingInput">BITS ID</label>
            </div>
            <div className={classes.centre}>
              <button type="submit" className={classes.submitBtn}>
                Submit
              </button>
            </div>
          </Form>
        </div>
      ) : (
        <p className={classes.message}>
          Access Denied: You must be in the class to gain access. Please provide
          access to location if you are in the class.
        </p>
      )}
    </div>
  );
}
