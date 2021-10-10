import React, { Fragment, useContext } from "react";
import WizContext from "../../store/wiz-context";

export default function WizSelectedInfo() {
  const ctx = useContext(WizContext);
  return (
    <section className="text-muted">
      {ctx.selectedCandidate ? (
        <Fragment>
          <h6>Candidate:</h6>
          <p>{ctx.selectedCandidate.name}</p>
        </Fragment>
      ) : (
        <Fragment />
      )}
      {ctx.selectedCompany ? (
        <Fragment>
          <h6>Company:</h6>
          <p>{ctx.selectedCompany.name}</p>
        </Fragment>
      ) : (
        <Fragment />
      )}
    </section>
  );
}
