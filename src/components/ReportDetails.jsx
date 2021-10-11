import React from "react";
import ModalWrapper from "./UI/ModalWrapper";
import { Row, Col } from "react-bootstrap";
import styles from "./ReportDetails.module.css";

export default function ReportDetails(props) {
  const { report } = props;

  return (
    <ModalWrapper
      title="Report details"
      content={<Content report={report} />}
      onClose={props.onClose}
    />
  );
}

const Content = (props) => {
  const { report } = props;
  return (
    <Row className={styles.reportDetails}>
      <Col sm={6}>
        <h6>Company</h6>
        <span>{report.companyName}</span>
        <h6>Interview Date</h6>
        <span>{report.getInterviewDate()}</span>
        <h6>Phase</h6>
        <span>{report.phase}</span>
        <h6>Status</h6>
        <span>{report.status}</span>
      </Col>
      <Col sm={6}>
        <h6>Notes</h6>
        <p>{report.note}</p>
      </Col>
    </Row>
  );
};
