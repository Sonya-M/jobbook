import React, { Fragment } from "react";
import styles from "./CandidateReportsTRow.module.css";

import {
  BsFillEyeFill,
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
  BsFillTrashFill,
  BsPencilFill,
} from "react-icons/bs";

export default function CandidateReportsTBody(props) {
  const r = props.report;
  return (
    <tr className={styles.reportsTableRow}>
      <td>{r.companyName}</td>
      {props.admin ? <td>{r.candidateName}</td> : <Fragment />}
      <td>{props.admin ? r.getShortInterviewDate() : r.getInterviewDate()}</td>
      <td className={styles.phase}>{r.phase}</td>
      <td className={styles.status}>
        {r.status.toLowerCase() === "passed" ? (
          <BsFillHandThumbsUpFill color="lime" />
        ) : (
          <BsFillHandThumbsDownFill color="crimson" />
        )}
      </td>
      <td>
        <BsFillEyeFill
          onClick={() => props.onEyeClick(r)}
          className={styles.action}
        />
      </td>
      {props.admin ? (
        <Fragment>
          <td>
            <BsPencilFill
              color="dodgerBlue"
              onClick={() => props.onEditReport(r.id)}
              className={styles.action}
            />
          </td>
          <td>
            <BsFillTrashFill
              color="crimson"
              onClick={() => props.onDeleteReport(r.id)}
              className={styles.action}
            />
          </td>
        </Fragment>
      ) : (
        <Fragment />
      )}
    </tr>
  );
}
