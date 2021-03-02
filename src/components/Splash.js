import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import MetaTags from "react-meta-tags";

const Splash = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setStep(2);
        }, 200);
      }, 1900);
    }, 100);
  }, [step]);

  return (
    <>
      <MetaTags>
        <title>Cleaning more battle helmets...</title>
        <meta
          name="Word Battle"
          content="You have 90 seconds to compete in a room."
        />
      </MetaTags>

      <div className="splash-bg">
        {step == 1 ? (
          <img
            className={visible ? "fadeIn logo" : "fadeOut logo"}
            src={logo}
          />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              className={visible ? "fadeIn" : "fadeOut"}
              style={{ color: "white" }}
            >
              by Iyiola Owabumowa
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Splash;
