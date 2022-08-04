import React from "react";
import CharacterCard from "./CharacterCard";
import * as _ from "lodash";
import { useState } from "react";
import { runFireWorks } from "../lib/utils";
import { useEffect } from "react";
import { GrPowerReset } from "react-icons/gr";

const prepareStateFromWord = (given_word) => {
  let word = given_word.toUpperCase();
  let chars = _.shuffle(Array.from(word));
  return {
    word,
    chars,
    attempt: 1,
    guess: "",
    completed: false,
  };
};

const WordCard = ({ value }) => {
  const [state, setState] = useState(prepareStateFromWord(value));
  const [isShowReset, setIsShowReset] = useState(false);
  const activationHandler = (c) => {
    console.log(`${c} has been activated.`);

    let guess = state.guess + c;
    setState({ ...state, guess });
    if (guess.length === state.word.length) {
      if (guess === state.word) {
        // console.log("yeah!");
        runFireWorks();
        setState({ ...state, guess: "", completed: true });
      } else {
        console.log("reset");
        setState({ ...state, guess: "", attempt: state.attempt + 1 });
      }
    }
  };

  const handleReset = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    if (state.completed) {
      const timer = setTimeout(() => {
        setIsShowReset(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.completed]);
  return (
    <div>
      {state.chars.map((c, i) => (
        <CharacterCard
          value={c}
          key={i}
          activationHandler={activationHandler}
          attempt={state.attempt}
        />
      ))}
      {isShowReset && (
        <GrPowerReset onClick={handleReset} style={{ cursor: "pointer" }} />
      )}
    </div>
  );
};

export default WordCard;
