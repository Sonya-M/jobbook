import React, { Fragment, useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import CandidateCommunicator from "../services/CandidateCommunicator";
import ReportCommunicator from "../services/ReportCommunicator";
import ErrorDisplay from "../components/ErrorDisplay";
import LoaderRipple from "../components/UI/LoaderRipple";
import CandidateInfo from "../components/CandidateInfo";
import CandidateReportsTable from "../components/CandidateReportsTable";
import AuthContext from "../store/auth-context";
import HrStyled from "../components/UI/HrStyled";
import { sortByPropWithStrValue, sortByDate } from "../utilities/helpers";
import { SESSION_EXPIRED } from "../shared/constants";
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

  // TODO: too much repetition here (see admin page)
  const sortReportsBy = (propName, desc) => {
    setReports(sortByPropWithStrValue(reports, propName, desc)); // this will
    // preserve the sorting order when the search bar is cleared
  };
  const sortByCompany = (desc) => {
    sortReportsBy("companyName", desc);
  };
  const sortByPhase = (desc) => {
    sortReportsBy("phase", desc);
  };
  const sortByStatus = (desc) => {
    sortReportsBy("status", desc);
  };
  const sortReportsByDate = (desc) => {
    setReports(sortByDate(reports, "interviewDate", desc)); // this will
    // preserve the sorting order when the search bar is cleared
  };

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
          <CandidateReportsTable
            reports={reports}
            onCompanyClick={sortByCompany}
            onDateClick={sortReportsByDate}
            onPhaseClick={sortByPhase}
            onStatusClick={sortByStatus}
          />
        ) : (
          <ErrorDisplay message="No reports" />
        )}
      </Fragment>
    </div>
  );
}
