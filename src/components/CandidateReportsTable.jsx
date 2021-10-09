import React, { Fragment, useState } from "react";
import {
  BsFillEyeFill,
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
  BsFillTrashFill,
  BsPencilFill,
} from "react-icons/bs";
import { Table } from "react-bootstrap";
import styles from "./CandidateReportsTable.module.css";
import ReportDetails from "./ReportDetails";

export default function CandidateReportsTable(props) {
  const [reportToModal, setReportToModal] = useState(null);
  const { reports } = props;

  const hideModal = () => {
    setReportToModal(null);
  };
  const displayModal = (r) => {
    setReportToModal(r);
  };

  return (
    <Fragment>
      <Table
        responsive
        striped
        bordered
        hover
        className={`my-2 ${styles.reportsTable}`}
      >
        <thead>
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
        <tbody>
          {reports.map((r) => {
            return (
              <tr key={r.id}>
                <td>{r.companyName}</td>
                {props.admin ? <td>{r.candidateName}</td> : <Fragment />}
                <td>
                  {props.admin
                    ? r.getShortInterviewDate()
                    : r.getInterviewDate()}
                </td>
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
                    onClick={() => displayModal(r)}
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
          })}
        </tbody>
      </Table>
      {reportToModal ? (
        <ReportDetails report={reportToModal} onClick={hideModal} />
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
}
