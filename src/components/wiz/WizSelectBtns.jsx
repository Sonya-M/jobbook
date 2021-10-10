import React, { useContext } from "react";
import WizContext from "../../store/wiz-context";

import styles from "./WizSelectBtns.module.css";
import { Button } from "react-bootstrap";

export default function WizSelectBtns(props) {
  const ctx = useContext(WizContext);
  return (
    <div className={`${styles.buttonBox} d-flex  justify-content-between `}>
      {ctx.currentStep !== 0 ? (
        <Button variant="dark" onClick={ctx.onBackBtnClick}>
          Back
        </Button>
      ) : (
        // must use div instead of Fragment for layout
        <div />
      )}
      <Button
        variant="dark"
        className={!props.selected ? "disabled" : " "}
        onClick={ctx.onNextBtnClick}
      >
        Next
      </Button>
    </div>
  );
}
