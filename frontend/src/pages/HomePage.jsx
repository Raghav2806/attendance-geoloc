import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import classes from "./Home.module.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function HomePage() {
  const [url, setUrl] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    })
  }, [])
  async function handleGenerateQr() {
        const response = await fetch(`${backendURL}/gen-url`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude, longitude }),
        });

        const data = await response.json();
        setUrl(data.url);
      
  }
  return (
    <>
      <button onClick={handleGenerateQr}>Generate QR</button>
      <div className={classes.qr}>
        {url ? <QRCodeSVG value={url} /> : <p>No url</p>}
      </div>
    </>
  );
}