import React from "react";

const flash = (message, className) => {
  if (message) {
    return <div className={className}>{message}</div>;
  }
};

export default flash;
