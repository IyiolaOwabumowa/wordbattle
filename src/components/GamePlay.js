import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "../actions/game.actions";
import MetaTags from "react-meta-tags";

import axios from "axios";
import Header from "./Header";
import WordBoard from "./WordBoard";
import WordDeck from "./WordDeck";
import Keypress from "../assets/keypress.mp3";
import Right from "../assets/right.mp3";
import Wrong from "../assets/wrong.mp3";

const GamePlay = ({ socket, gameplayMusic }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [deck, setDeck] = useState([]);
  const [deckSet, setDeckSet] = useState(false);
  const [formedWords, setFormedWords] = useState([]);
  const [letters, setLetters] = useState([]);
  const [time, setTime] = useState(null);
  const [notification, setNotification] = useState(null);
  const [points, setPoints] = useState(0);
  const [opponent, setOpponent] = useState(null);
  const [playing, setPlaying] = useState(false);

  const room = useSelector((state) => state.gameReducer.room);

  const stopMusic = useSelector((state) => state.gameReducer.stopMusic);

  const gameStatus = useSelector((state) => state.gameReducer.gameStatus);


  function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => v === value && count++);
    return count;
  }

  function getOccurrenceArrayOfObjects(array, value) {
    var count = 0;
    array.forEach((v) => v.name === value && count++);
    return count;
  }

  useEffect(() => {
    gameplayMusic.play();
  }, []);

  useEffect(() => {
    socket.emit("readyToStart", room);

    const timeHandler = (data) => {
      setTime(data);
      if (data == 1) {
        // gameplayMusic.pause();
        dispatch(gameActions.endGame());
        history.push("/results");
      }
    };

    const deckHandler = (data) => {
      console.log("generated");
      setDeck(data);
    };

    socket.on("game-timer", timeHandler);
    socket.on("getRoomDeck", deckHandler);
    return () => {
      socket.off("game-timer", timeHandler);
      socket.on("getRoomDeck", deckHandler);
    };
  }, []);

  useEffect(() => {
    const audio = new Audio(Keypress);
    const right = new Audio(Right);
    const wrong = new Audio(Wrong);

    audio.volume = 0.1;
    right.volume = 0.05;
    wrong.volume = 0.1;

    const submitWord = () => {
      const concatLetters = () => {
        var word = "";
        letters.forEach((letter) => (word += letter));
        return word;
      };

      const word = concatLetters();

      const correct = true;

      if (formedWords.includes(word)) {
        setNotification("You've found this word already");
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      } else {
        axios
          .get(
            `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?strictMatch=false`,
            {
              headers: {
                Accept: "application/json",
                app_id: "aa01ce93",
                app_key: "42ff31ae9ce033a7a8e5f3b87531d9c3",
              },
            }
          )
          .then((res) => {
            console.log(res.status);
            if (res.status == 200) {
              right.play();
              setFormedWords([...formedWords, word]);
              setPoints(points + 5);
              socket.emit("addPoints", points + 5);
              setLetters([]);
              for (var j = 0; j < deck.length; j++) {
                const newArray = deck;
                newArray[j] = { ...newArray[j], count: 1 };
                setDeck([...newArray]);
              }
            }
          })
          .catch((e) => {
            wrong.play();
          });
      }
    };

    const onKeyPress = ({ key }) => {
      if (deck.some((o) => o.name === key)) {
        if (
          getOccurrence(letters, key) < getOccurrenceArrayOfObjects(deck, key)
        ) {
          audio
            .play()
            .then(() => {})
            .catch((error) => console.error);

          setLetters([...letters, key]);

          for (var i = 0; i < deck.length; i++) {
            const letterObject = deck[i];
            if (letterObject.name === key && letterObject.count === 1) {
              const newArray = deck;
              newArray[i] = { ...newArray[i], count: 0 };
              setDeck([...newArray]);
              break;
            }
          }
        }
      }

      if (key === "Enter") {
        audio
          .play()
          .then(() => {})
          .catch((error) => console.error);
      }
      if (key === "Backspace") {
        const oldLetters = letters;
        for (var k = deck.length - 1; k > 0; k--) {
          const letterObject = deck[k];
          if (
            letterObject.name === letters[letters.length - 1] &&
            letterObject.count === 0
          ) {
            const newArray = deck;
            newArray[k] = { ...newArray[k], count: 1 };
            setDeck([...newArray]);
            break;
          }
        }
        oldLetters.pop();
        setLetters([...oldLetters]);
      }
      if (key === "Enter") {
        submitWord();
      }
    };

    window.addEventListener("keydown", onKeyPress);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [deck, formedWords, letters, points, stopMusic]);

  return (
    <>
  
      <Header
        points={points}
        notification={notification}
        time={time}
        opponent={opponent}
      />
      <WordBoard letters={letters} isLettersEmpty={letters.length === 0} />
      <WordDeck deck={deck} letters={letters} getOccurrence={getOccurrence} />
    </>
  );
};

export default GamePlay;
