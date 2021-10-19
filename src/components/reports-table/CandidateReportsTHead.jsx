import React, { Fragment, useState } from "react";

import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import styles from "./CandidateReportsTHead.module.css";

export default function CandidateReportsTHead(props) {
  // false: sorted in ascending order; true: sorted in descending order
  const [companySortOrder, setCompanySortOrder] = useState(false);
  const [candidateSortOrder, setCandidateSortOrder] = useState(false);
  const [dateSortOrder, setDateSortOrder] = useState(false);
  const [phaseSortOrder, setPhaseSortOrder] = useState(false);
  const [statusSortOrder, setStatusSortOrder] = useState(false);

  const handleCompanyClick = () => {
    props.onCompanyClick(companySortOrder);
    setCompanySortOrder((companySortOrder) => !companySortOrder);
  };
  const handleCandidateClick = () => {
    props.onCandidateClick(candidateSortOrder);
    setCandidateSortOrder((candidateSortOrder) => !candidateSortOrder);
  };
  const handleDateClick = () => {
    props.onDateClick(dateSortOrder);
    setDateSortOrder((dateSortOrder) => !dateSortOrder);
  };
  const handlePhaseClick = () => {
    props.onPhaseClick(phaseSortOrder);
    setPhaseSortOrder((phaseSortOrder) => !phaseSortOrder);
  };
  const handleStatusClick = () => {
    props.onStatusClick(statusSortOrder);
    setStatusSortOrder((statusSortOrder) => !statusSortOrder);
  };

  return (
    <thead className={styles.reportsTableTHead}>
      <tr>
        <th className={styles.action} onClick={handleCompanyClick}>
          <span>Company</span>
          {companySortOrder ? <VscTriangleDown /> : <VscTriangleUp />}
        </th>
        {props.admin ? (
          <th className={styles.action} onClick={handleCandidateClick}>
            <span>Candidate</span>
            {candidateSortOrder ? <VscTriangleDown /> : <VscTriangleUp />}
          </th>
        ) : (
          <Fragment />
        )}
        <th className={styles.action} onClick={handleDateClick}>
          <span>Date</span>
          {dateSortOrder ? <VscTriangleDown /> : <VscTriangleUp />}
        </th>
        <th className={styles.action} onClick={handlePhaseClick}>
          <span>Phase</span>
          {phaseSortOrder ? <VscTriangleDown /> : <VscTriangleUp />}
        </th>
        <th className={styles.action} onClick={handleStatusClick}>
          <span>Status</span>
          {statusSortOrder ? <VscTriangleDown /> : <VscTriangleUp />}
        </th>
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
