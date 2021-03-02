import React, { useState, useEffect } from "react";
import uuid from "react-uuid";

const WordDeck = ({ deck, letters, getOccurrence }) => {
  return (
    <div className="worddeck-container">
      {deck?.map((obj, idx) => {
        return (
          <div
            className={` ${
              letters.includes(obj.name) && obj.count === 0
                ? "deck-letter deck-letter-used"
                : "deck-letter"
            }`}
            key={uuid()}
          >
            <h1>{obj.name.toUpperCase()}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default WordDeck;
