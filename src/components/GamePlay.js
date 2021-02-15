import React, { useState, useEffect } from "react";
import moment from "moment";
import { usePubNub } from "pubnub-react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import WordBoard from "./WordBoard";
import WordDeck from "./WordDeck";
import Keypress from "../assets/keypress.mp3";
import Right from "../assets/right.mp3";
import Wrong from "../assets/wrong.mp3";

const GamePlay = ({ channelName }) => {
  const history = useHistory();

  const [deck, setDeck] = useState([
    { name: "t", count: 1 },
    { name: "o", count: 1 },
    { name: "b", count: 1 },
    { name: "i", count: 1 },
    { name: "l", count: 1 },
    { name: "o", count: 1 },
    { name: "l", count: 1 },
    { name: "a", count: 1 },
  ]);
  const [formedWords, setFormedWords] = useState([]);
  const [letters, setLetters] = useState([]);
  const [time, setTime] = useState(15);
  const [notification, setNotification] = useState(null);
  const [points, setPoints] = useState(0);
  const [opponent, setOpponent] = useState(null);
  const pubnub = usePubNub();

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
    pubnub
      .publish({
        channel: channelName,
        message: { test: "test" },
      })
      .then((res) => {
        pubnub.fetchMessages(
          {
            channels: [channelName],
            end: res,
            count: 25, // default/max is 25 messages for multiple channels (up to 500)
          },
          function (status, response) {
            response.channels[channelName].forEach((item) => {
              if (localStorage.getItem("role") === "owner") {
                if (item.message.joiner) {
                  setOpponent(item.message.joiner);
                }
              } else {
                if (item.message.owner) {
                  setOpponent(item.message.owner);
                }
              }
            });
          }
        );
      });
  }, []);

  useEffect(() => {

  }, [time]);

  useEffect(() => {
    const audio = new Audio(Keypress);
    const right = new Audio(Right);
    const wrong = new Audio(Wrong);

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
        if (correct) {
          // console.log([...formedWords, word]);

          right.play();
          setFormedWords([...formedWords, word]);
          setPoints(points + 5);
          const playerInfo = {
            playername: localStorage.getItem("name"),
            points: points + 5,
          };
          localStorage.setItem("player-info", JSON.stringify(playerInfo));
          setLetters([]);
          for (var j = 0; j < deck.length; j++) {
            const newArray = deck;
            newArray[j] = { ...newArray[j], count: 1 };
            setDeck([...newArray]);
          }
        } else {
          wrong.play();
        }
      }

      // axios
      //   .get(
      //     `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/ad?strictMatch=false`,
      //     {
      //       headers: {
      //         Accept: "application/json",
      //         app_id: "aa01ce93",
      //         app_key: "42ff31ae9ce033a7a8e5f3b87531d9c3",
      //       },
      //     }
      //   )
      //   .then((res) => {
      //     console.log(res.status);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    };

    const onKeyPress = ({ key }) => {
      if (deck.some((o) => o.name === key)) {
        if (
          getOccurrence(letters, key) < getOccurrenceArrayOfObjects(deck, key)
        ) {
          audio.play();
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
  }, [deck, formedWords, letters, points]);

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
