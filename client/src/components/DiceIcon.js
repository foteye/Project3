import React from "react";

import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from "react-icons/fa";

function DiceIcon({ d }) {
  switch (d) {
    case "1":
      return <FaDiceOne style={{ fontSize: "24px" }} />;
    case "2":
      return <FaDiceTwo style={{ fontSize: "24px" }} />;
    case "3":
      return <FaDiceThree style={{ fontSize: "24px" }} />;
    case "4":
      return <FaDiceFour style={{ fontSize: "24px" }} />;
    case "5":
      return <FaDiceFive style={{ fontSize: "24px" }} />;
    case "6":
      return <FaDiceSix style={{ fontSize: "24px" }} />;
    default:
      return <></>;
  }
}

export { DiceIcon };
