import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function RelativeTime({ timestamp }) {
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const parsedDate = dayjs(timestamp);
    const timeAgo = parsedDate.fromNow();
    setRelativeTime(timeAgo);
  }, [timestamp]);

  return <span>{relativeTime}</span>;
}

export default RelativeTime;
