import React, { useEffect, useState } from "react";
import uuid from "react-uuid";

const WordBoard = ({ letters, isLettersEmpty }) => {
  return (
    <div className="board-container">
      <p>
        {" "}
        Type letters on your keyboard and press <strong>ENTER</strong> to submit
        each word you form
      </p>

      <p>Form as many words as possible from your word deck</p>

      <div className="letter-container">
        {isLettersEmpty ? (
          <>
            <h1>Start Typing</h1>
          </>
        ) : (
          <>
            {letters.map((letter) => {
              return (
                <div className="deck-letter board-letter" key={uuid()}>
                  <h1>{letter.toUpperCase()}</h1>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default WordBoard;
