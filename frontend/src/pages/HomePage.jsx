import React, { useEffect } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import {QRCodeSVG} from 'qrcode.react';

import classes from './Home.module.css';

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function HomePage() {
  const url = useLoaderData();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async(position) => {
      const {latitude, longitude} = position.coords;
    })
  },[])
  return (
    <>
    <Form method="post">
      <label htmlFor="url">URL</label>
      <input id="url" type="password" name="url" required />
      <button type="submit">Generate QR</button>
    </Form>
    <div className={classes.qr}>
      {url ? (
        <QRCodeSVG value={url} />
      ): (
        <p>No url</p>
      )}
    </div>
    </>
  );
}

export async function loader() {
  const response = await fetch(`${backendURL}/get-url`);
  if (!response.ok) {
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.url || null;
  }
}

export async function action({request}) {
  const data = await request.formData();
  const eventData = {
    url: data.get('url')
  }
  const response= await fetch(`${backendURL}/save-url`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(eventData)
  })

  if(!response.ok) {
    throw json({message: "Could not save event."}, {status: 500})
  }

  return redirect("/");
}
