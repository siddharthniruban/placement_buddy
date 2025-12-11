import React, { useState } from "react";

export default function BinarySearchAnimation() {
  const baseArray = [1, 3, 5, 7, 9, 11, 13, 15];
  const [status, setStatus] = useState("Click Start Search");
  const [step, setStep] = useState(0);

  async function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  const start = async () => {
    let left = 0;
    let right = baseArray.length - 1;
    let target = 11;
    let s = 0;

    setStatus("Starting...");
    setStep(0);

    await sleep(500);

    while (left <= right) {
      s++;
      setStep(s);

      const mid = Math.floor(left + (right - left) / 2);
      setStatus(`Checking mid ${mid} = ${baseArray[mid]}`);

      await sleep(700);

      if (baseArray[mid] === target) {
        setStatus(`Found ${target} at index ${mid}`);
        return;
      }

      if (baseArray[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    setStatus(`Not found`);
  };

  return (
    <div className="section">
      <h2 className="section-title">Binary Search Animation</h2>
      <button onClick={start} className="btn-blue">Start Search</button>
      <p>Status: {status}</p>
      <p>Steps: {step}</p>
    </div>
  );
}