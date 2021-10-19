import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import ErrorDisplay from "../components/UI/ErrorDisplay";
import SearchBar from "../components/search-bar/SearchBar";
import CandidateReportsTable from "../components/reports-table/CandidateReportsTable";
import ReportCommunicator from "../services/ReportCommunicator";
import LoaderRipple from "../components/UI/LoaderRipple";
import ModalConfirmDialog from "../components/UI/ModalConfirmDialog";

import AuthContext from "../store/auth-context";
import { SESSION_EXPIRED } from "../shared/constants";
import {
  includesIgnoreCase,
  sortByPropWithStrValue,
  sortByDate,
} from "../utilities/helpers";

import styles from "./AdminPage.module.css";

export default function AdminPage(props) {
  let history = useHistory();
  const authCtx = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // error as a string with the error msg
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

  const { onSessionExpired } = authCtx;
  const getReports = useCallback(() => {
    ReportCommunicator.getAll()
      .then((data) => {
        setReports(data);
        setFilteredReports(data);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        if (error.message === SESSION_EXPIRED) onSessionExpired();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [onSessionExpired]);

  useEffect(() => {
    getReports();
  }, [getReports]);

  useEffect(() => {
    setFilteredReports(
      reports.filter((report) => {
        return includesIgnoreCase(
          `${report.companyName} ${report.candidateName}`,
          searchText
        );
      })
    );
  }, [searchText, reports]);

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
    setShowConfirmDialog(true);
    setReportToDelete(id);
    // if (window.confirm("Delete report?")) {
    //   deleteReport(id);
    // }
  };

  const handleCancelDelete = () => {
    setReportToDelete(null);
    setShowConfirmDialog(false);
  };

  const handleConfirmDelete = () => {
    deleteReport();
    setShowConfirmDialog(false);
  };

  const handleEditReport = (id) => {
    history.push("/wizard/" + id);
  };

  const sortReportsBy = (propName, desc) => {
    setFilteredReports(sortByPropWithStrValue(filteredReports, propName, desc));
    setReports(sortByPropWithStrValue(reports, propName, desc)); // this will
    // preserve the sorting order when the search bar is cleared
  };
  const sortByCompany = (desc) => {
    sortReportsBy("companyName", desc);
  };
  const sortByCandidate = (desc) => {
    sortReportsBy("candidateName", desc);
  };
  const sortByPhase = (desc) => {
    sortReportsBy("phase", desc);
  };
  const sortByStatus = (desc) => {
    sortReportsBy("status", desc);
  };
  const sortReportsByDate = (desc) => {
    setFilteredReports(sortByDate(filteredReports, "interviewDate", desc));
    setReports(sortByDate(reports, "interviewDate", desc)); // this will
    // preserve the sorting order when the search bar is cleared
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
        onEditReport={handleEditReport}
        onCompanyClick={sortByCompany}
        onCandidateClick={sortByCandidate}
        onDateClick={sortReportsByDate}
        onPhaseClick={sortByPhase}
        onStatusClick={sortByStatus}
      />
      {showConfirmDialog ? (
        <ModalConfirmDialog
          content="Delete report?"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      ) : null}
    </div>
  );
}
