import React, { useEffect, useState } from "react";

function TimeDifference({ date }) {
  // Set the target date
  const targetDate = new Date(date);

  // State variable to store the time difference
  const [timeDifference, setTimeDifference] = useState(null);

  // Function to calculate the time difference and update the state
  const calculateTimeDifference = () => {
    const currentDate = new Date();
    const timeDifference = currentDate - targetDate;
    setTimeDifference(timeDifference);
  };

  // Use useEffect to calculate the time difference when the component mounts
  useEffect(() => {
    calculateTimeDifference();
  }, []);

  // Determine the appropriate unit and value to display
  let unit, value;
  if (timeDifference >= 86400000) {
    // 1 day = 24 hours = 86,400,000 milliseconds
    unit = "days";
    value = Math.floor(timeDifference / 86400000);
  } else if (timeDifference >= 3600000) {
    // 1 hour = 3,600,000 milliseconds
    unit = "hours";
    value = Math.floor(timeDifference / 3600000);
  } else if (timeDifference >= 60000) {
    // 1 minute = 60,000 milliseconds
    unit = "minutes";
    value = Math.floor(timeDifference / 60000);
  } else {
    unit = "seconds";
    value = Math.floor(timeDifference / 1000);
  }

  return (
    <>
      {value} {unit} ago
    </>
  );
}

export default TimeDifference;
