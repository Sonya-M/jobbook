import React, { useContext } from "react";
import WizContext from "../../store/wiz-context";

import styles from "./WizardSteps.module.css";

export default function WizardSteps(props) {
  const ctx = useContext(WizContext);

  const stepsDesc = [
    "Select Candidate",
    "Select Company",
    "Fill Report Details",
  ];

  const handleClick = (step) => {
    ctx.onStepClick(step);
  };

  const steps = [];
  for (let i = 0; i < 3; i++) {
    let classes = i === ctx.currentStep ? styles.currentStep : "";
    steps.push(
      <li
        className={`${classes} ${ctx.nextStep >= i ? styles.active : " "}`}
        key={i}
        onClick={() => handleClick(i)}
      >
        {stepsDesc[i]}
      </li>
    );
  }
  return <ol className={styles.stepList}>{steps}</ol>;
}
