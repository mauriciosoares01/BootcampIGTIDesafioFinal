import React from "react";
import PERIODS from "../helpers/periodsGenerator";

export default function PeriodPicker({ currentPeriod, setCurrentPeriod }) {
  function handleChange(event) {
    setCurrentPeriod(event.target.value);
  }

  return (
    <div id="periodSelector">
      <select value={currentPeriod} onChange={handleChange}>
        {PERIODS.map((period) => {
          return (
            <option key={period} value={period}>
              {period}
            </option>
          );
        })}
      </select>
    </div>
  );
}
