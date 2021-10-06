import React, { Fragment, useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import CandidateCommunicator from "../services/CandidateCommunicator";
import ReportCommunicator from "../services/ReportCommunicator";
import ErrorDisplay from "../components/ErrorDisplay";
import LoaderRipple from "../components/UI/LoaderRipple";
import CandidateInfo from "../components/CandidateInfo";
import CandidateReportsTable from "../components/CandidateReportsTable";
import AuthContext from "../store/auth-context";
import { SESSION_EXPIRED, PLACEHOLDER_IMG } from "../shared/constants";
import styles from "./CandidateReports.module.css";
import HrStyled from "../components/UI/HrStyled";

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
        setError(error.message);
        if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
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
        setError(error.message);
        if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
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
    <div className={styles.container}>
      <CandidateInfo candidate={selectedCandidate} />
      <HrStyled />
      <Fragment>
        {reports.length ? (
          <CandidateReportsTable reports={reports} />
        ) : (
          <ErrorDisplay message="No reports" />
        )}
      </Fragment>
    </div>
  );
}
