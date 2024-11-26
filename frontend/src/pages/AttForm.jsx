import { useEffect, useState } from "react";
import { useParams, Form } from "react-router-dom";
import { getCurrentLocation } from "./HomePage";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
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

  async function handleSuccess(response) {
    const { email, hd } = jwtDecode(response.credential);
    const requestBody = {
      email,
      formId,
    };

    if (hd == "pilani.bits-pilani.ac.in") {
      const response = await fetch(
        `https://attendance-geoloc.onrender.com/mark-attendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestBody }),
        }
      );

      if (response.ok) {
        window.location.href = "/success"; // Redirect on success
      } else {
        console.error("Error marking attendance.");
      }
    }
  }

  function handleError() {
    console.log("Error");
  }

  return (
    <div className={classes.page}>
      <Backdrop />
      {checking ? (
        <p className={classes.message}>Checking your location...</p>
      ) : accessGranted ? (
        <div className={classes.container}>
          <h1>Attendance Form</h1>
          <p>Please login using your BITS email to mark your attendance.</p>
          <GoogleOAuthProvider clientId="622786280217-2ucnf2o0o3q0oiir4tr0n4ug23q85ap4.apps.googleusercontent.com">
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </GoogleOAuthProvider>
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
