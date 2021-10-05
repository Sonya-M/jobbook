import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import CandidateCommunicator from "../services/CandidateCommunicator";
import ReportCommunicator from "../services/ReportCommunicator";
import ErrorDisplay from "../components/ErrorDisplay";
import LoaderRipple from "../components/UI/LoaderRipple";
import ImageGuaranteed from "../components/UI/ImageGuaranteed";
import AuthContext from "../store/auth-context";
import { SESSION_EXPIRED, PLACEHOLDER_IMG } from "../shared/constants";
import { Row, Col, Table } from "react-bootstrap";
import { BsFillEyeFill } from "react-icons/bs";
import styles from "./CandidateReports.module.css";

export default function CandidateReports(props) {
  const authCtx = useContext(AuthContext);
  let { id } = useParams();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [reports, setReports] = useState([]);

  const [loadingCandidate, setLoadingCandidate] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    CandidateCommunicator.getById(id)
      .then((data) => {
        console.log("selectedCandidate data: ", data);
        setSelectedCandidate(data);
      })
      .catch((error) => {
        console.log(error);
        if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
        setError(error.message);
      })
      .finally(() => {
        setLoadingCandidate(false);
      });
  }, []);

  useEffect(() => {
    ReportCommunicator.getAllForCandidate(id)
      .then((data) => {
        console.log("reports for candidate: ", data);
        setReports(data);
      })
      .catch((error) => {
        console.log(error);
        if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
        setError(error.message);
      })
      .finally(() => {
        setLoadingReports(false);
      });
  }, []);

  if (error) {
    return <ErrorDisplay message={error} />;
  }
  if (loadingCandidate || loadingReports) {
    return <LoaderRipple />;
  }
  if (!selectedCandidate || selectedCandidate.length === 0) {
    return <ErrorDisplay message="An unexpected error occurred." />;
  }

  return (
    <Row>
      <Col sm={4}>
        <ImageGuaranteed
          preferredImg={selectedCandidate.avatar}
          placeholderImg={PLACEHOLDER_IMG}
          preferredImgAlt={selectedCandidate.name}
          alt="avatar"
        />
      </Col>
      <Col sm={8}>
        <h2>{selectedCandidate.name}</h2>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>email</th>
              <td>{selectedCandidate.email}</td>
            </tr>
            <tr>
              <th>birthday</th>
              <td>{selectedCandidate.getBirthday()}</td>
            </tr>
            <tr>
              <th>education</th>
              <td>{selectedCandidate.education}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
      <Col>
        <Table bordered hover className={`my-2 ${styles.reportsTable}`}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Interview date</th>
              <th>Phase</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => {
              return (
                <tr key={r.id}>
                  <td>{r.companyName}</td>
                  <td>{r.getInterviewDate()}</td>
                  <td className={styles.phase}>{r.phase}</td>
                  <td>{r.status}</td>
                  <td>
                    <BsFillEyeFill />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
