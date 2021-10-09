import React, { Fragment } from "react";
import styles from "./CandidateReportsTHead.module.css";

export default function CandidateReportsTHead(props) {
  return (
    <thead className={styles.reportsTableTHead}>
      <tr>
        <th>Company</th>
        {props.admin ? <th>Candidate</th> : <Fragment />}
        <th>Interview date</th>
        <th>Phase</th>
        <th>Status</th>
        <th></th>
        {props.admin ? (
          <Fragment>
            <th></th>
            <th></th>
          </Fragment>
        ) : (
          <Fragment />
        )}
      </tr>
    </thead>
  );
}
