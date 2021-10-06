import React, { Fragment, useState, useEffect, useContext } from "react";
import LoaderRipple from "../components/UI/LoaderRipple";
import ErrorDisplay from "../components/ErrorDisplay";
import SearchBar from "../components/SearchBar";
import CandidateList from "../components/CandidateList";
import CandidateCommunicator from "../services/CandidateCommunicator";
import AuthContext from "../store/auth-context";
import { SESSION_EXPIRED } from "../shared/constants";
import { includesIgnoreCase } from "../utilities/helpers";

const Candidates = (props) => {
  const authCtx = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  useEffect(() => {
    // i.e. if no data cache for candidates is stored in context...
    console.log("Fetching candidates...");
    CandidateCommunicator.getAll()
      .then((data) => {
        console.log(data);
        setCandidates(data);
        setFilteredCandidates(data);
      })
      .catch((error) => {
        setError(error.message);
        if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredCandidates(
      candidates.filter((candidate) => {
        return includesIgnoreCase(candidate.name, searchText);
      })
    );
  }, [searchText]);

  const handleSearch = (filterText) => {
    setSearchText(filterText);
  };

  if (error) {
    return <ErrorDisplay message={error} />;
  }
  if (loading) {
    return <LoaderRipple />;
  }

  return (
    <Fragment>
      <SearchBar onSearch={handleSearch} />
      <div>
        <CandidateList candidates={filteredCandidates} />
      </div>
    </Fragment>
  );
};

export default Candidates;
