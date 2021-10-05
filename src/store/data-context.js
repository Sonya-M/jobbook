/**
 * The idea of this context is to fetch data only once, and then store it in the
 * provider - the component first checks if context already stores the data 
 * cache - if not, data is fetched by the component
 * and then stored until the App is unmounted or the session expires.
 * 
 * Note that reports for a single candidate are not cached
 */

import React, { useState } from "react";

const DataContext = React.createContext({
  candidates: [],
  reports: [],
  companies: [],
  storeCandidates: (data) => { },
  storeReports: (data) => { },
  storeCompanies: (data) => { }
});

export const DataContextProvider = (props) => {
  const [candidates, setCandidates] = useState([]);
  const [reports, setReports] = useState([]);
  const [companies, setCompanies] = useState([]);

  const storeCandidates = (data) => {
    console.log("storing candidates...")
    setCandidates(data);
  }

  const storeReports = (data) => {
    setReports(data);
  }

  const storeCompanies = (data) => {
    setCompanies(data);
  }

  return (
    <DataContext.Provider
      value={
        {
          candidates: candidates,
          reports: reports,
          companies: companies,
          storeCandidates: storeCandidates,
          storeReports: storeReports,
          storeCompanies: storeCompanies,
        }
      }>
      {props.children}
    </DataContext.Provider>
  )
}

export default DataContext;