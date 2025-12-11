import React from "react";

export default function Header({ title = "Binary Search Algorithm", subtitle = "Efficient searching technique for sorted arrays", badge = "Searching Algorithms" }) {
  return (
    <div className="header">
      <div className="day-badge">{badge}</div>
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
}