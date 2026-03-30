"use client";
import { useEffect, useState } from "react";
import * as client from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");

  const fetchWelcomeOnClick = async () => {
    const message = await client.fetchWelcomeMessage();
    setWelcomeOnClick(message);
  };

  useEffect(() => {
    client.fetchWelcomeMessage().then((message) => {
      setWelcomeOnLoad(message);
    });
  }, []);

  return (
    <div id="wd-http-client">
      <h3>HTTP Client</h3>
      <hr />
      <h4>Requesting on Click</h4>
      <button
        className="btn btn-primary me-2"
        id="wd-fetch-welcome"
        onClick={fetchWelcomeOnClick}
      >
        Fetch Welcome
      </button>
      <br />
      Response from server: <b>{welcomeOnClick}</b>
      <hr />
      <h4>Requesting on Load</h4>
      Response from server: <b>{welcomeOnLoad}</b>
      <hr />
    </div>
  );
}
