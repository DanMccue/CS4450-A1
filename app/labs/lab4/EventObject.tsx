"use client";

import type { MouseEvent } from "react";

export default function EventObject() {
  const showEventData = (event: MouseEvent<HTMLButtonElement>) => {
    alert(`You clicked at (${event.clientX}, ${event.clientY})`);
  };

  return (
    <div id="wd-event-object">
      <h2>The Event Object</h2>
      <button
        id="wd-event-object-click"
        className="btn btn-primary"
        onClick={showEventData}
      >
        Show Click Coordinates
      </button>
      <hr />
    </div>
  );
}
