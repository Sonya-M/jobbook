import React from "react";
import WizardView from "../components/wiz/WizardView";
import { WizContextProvider } from "../store/wiz-context";

export default function Wizard(props) {
  return (
    <WizContextProvider>
      <WizardView />
    </WizContextProvider>
  );
}
