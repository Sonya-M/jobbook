import React from "react";
import { BsFillEmojiNeutralFill } from "react-icons/bs";

export default function ErrorDisplay(props) {
  const msg = props.message ? props.message : "Error!";
  return (
    <div className="text-center m-5">
      <BsFillEmojiNeutralFill size="10rem" />
      <h2 className="display-5">{msg}</h2>
      {props.children}
    </div>
  );
}
