import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const CompatibilityWarning = () => {
  return (
    <div className="splash-bg">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            color: "white",
            padding: 50,
            textAlign: "center",
            lineHeight: 2,
          }}
        >
          Sorry, Word Battle doesn't work on mobile phones at the moment.
        </p>
      </div>
    </div>
  );
};

export default CompatibilityWarning;
