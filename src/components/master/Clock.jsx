"use client"
import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div>
      <h6 className='m-0 lh-3 text-center'>Time: {formattedTime}</h6>
    </div>
  );
};

export default Clock;
