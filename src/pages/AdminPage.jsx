import React, { useContext, useEffect, useState } from "react";
import ErrorDisplay from "../components/ErrorDisplay";
import SearchBar from "../components/SearchBar";
import CandidateReportsTable from "../components/CandidateReportsTable";
import ReportCommunicator from "../services/ReportCommunicator";
import LoaderRipple from "../components/UI/LoaderRipple";
import ConfirmModal from "../components/UI/ConfirmModal";

import AuthContext from "../store/auth-context";
import { SESSION_EXPIRED } from "../shared/constants";
import { includesIgnoreCase } from "../utilities/helpers";

import styles from "./AdminPage.module.css";

export default function AdminPage(props) {
  const authCtx = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // error as a string with the error msg
  const [showConfirm, setShowConfirm] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

  const getReports = () => {
    ReportCommunicator.getAll()
      .then((data) => {
        setReports(data);
        setFilteredReports(data);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    setFilteredReports(
      reports.filter((report) => {
        return includesIgnoreCase(
          `${report.companyName} ${report.candidateName}`,
          searchText
        );
      })
    );
  }, [searchText]);

  const handleSearch = (filterText) => {
    setSearchText(filterText);
  };

  const deleteReport = () => {
    if (reportToDelete !== null) {
      ReportCommunicator.delete(reportToDelete)
        .then((response) => {
          console.log(response);
          getReports();
        })
        .catch((error) => {
          setError(error.message);
          if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
        })
        .finally(() => {
          setReportToDelete(null);
        });
    }
  };

  const handleDeleteReport = (id) => {
    setShowConfirm(true);
    setReportToDelete(id);
    // if (window.confirm("Delete report?")) {
    //   deleteReport(id);
    // }
  };

  const handleCancelDelete = () => {
    setReportToDelete(null);
    setShowConfirm(false);
  };

  const handleConfirmDelete = () => {
    deleteReport();
    setShowConfirm(false);
  };

  if (error) {
    return <ErrorDisplay message={error} />;
  }
  if (loading) return <LoaderRipple />;
  return (
    <div className={styles.tableContainer}>
      <SearchBar onSearch={handleSearch} />
      <CandidateReportsTable
        admin={true}
        reports={filteredReports}
        onDeleteReport={handleDeleteReport}
      />
      {showConfirm ? (
        <ConfirmModal
          content="Delete report?"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      ) : null}
    </div>
  );
}
