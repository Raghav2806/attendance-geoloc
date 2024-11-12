import { useEffect, useState } from "react";
import { useParams, Form } from "react-router-dom";

export default function AttForm() {
  const {formId} = useParams();
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    async function checkLocationAccess() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://attendance-geoloc.vercel.app/verify-access/${formId}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ latitude, longitude }),
            }
          );

          const data = await response.json();
          setAccessGranted(data.accessGranted);
        });
      }
    }
    checkLocationAccess();
  }, [formId]);

  return (
    <div>
      {accessGranted ? (
        <Form method="post">
          <label>BITS ID</label>
          <input type="text" name="bits_id" required />
          <button type="submit">Submit</button>
        </Form>
      ) : (
        <p>Access Denied: You must be in the class to gain access.</p>
      )}
    </div>
  );
}
