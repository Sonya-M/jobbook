import React, { Fragment, useState } from "react";
import { Table } from "react-bootstrap";
import ReportDetails from "./ReportDetails";
import CandidateReportsTHead from "./CandidateReportsTHead";
import CandidateReportsTRow from "./CandidateReportsTRow";
import styles from "./CandidateReportsTable.module.css";

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
        className={`my-2 ${styles.reportsTable}`}
      >
        <CandidateReportsTHead admin={props.admin} />
        <tbody>
          {reports.map((r) => {
            return (
              <CandidateReportsTRow
                key={r.id}
                report={r}
                onEyeClick={displayModal}
                onEditReport={props.onEditReport}
                onDeleteReport={props.onDeleteReport}
                admin={props.admin}
              />
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
