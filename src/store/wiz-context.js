import React, { useContext, useReducer, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReportCommunicator from "../services/ReportCommunicator";
import CandidateCommunicator from "../services/CandidateCommunicator";
import CompanyCommunicator from "../services/CompanyCommunicator";

import AuthContext from "../store/auth-context";
import { SESSION_EXPIRED } from "../shared/constants";

const WizContext = React.createContext({
  selectedCandidate: null,
  selectedCompany: null,
  currentStep: 0, // currently active step, can already have input
  nextStep: 0, // next step where no input was provided by user
  candidates: [],
  companies: [],
  editedReport: null, // can be set only when editing an existing report in db
  // outside of the reducer:
  error: false,
  loading: true,
  onSelectCandidate: (candidate) => { },
  onSelectCompany: (company) => { },
  onBackBtnClick: () => { },
  onNextBtnClick: () => { },
  onStepClick: (step) => { },
  onFormSubmit: (formInput) => { },
})

// for the ctx provider:
const defaultWizState = {
  selectedCandidate: null,
  selectedCompany: null,
  currentStep: 0, // currently active step, can already have input
  nextStep: 0, // next step where no input was provided by user
  candidates: [],
  companies: [],
  editedReport: null, // can be set only when editing an existing report in db
  loadingCandidates: true,
  loadingCompanies: true,
  loadingReport: true,
};

const wizReducer = (state, action) => {
  if (action.type === "SELECT_CANDIDATE") {
    if (
      state.selectedCandidate &&
      state.selectedCandidate.id === action.payload.id
    ) {
      return {
        ...state,
        selectedCandidate: null, // deselect candidate
        nextStep: 0,
      };
    } else {
      return {
        ...state,
        selectedCandidate: action.payload,
        nextStep: state.selectedCompany ? 2 : 1,
      };
    }
  }
  if (action.type === "SELECT_COMPANY") {
    if (
      state.selectedCompany &&
      state.selectedCompany.id === action.payload.id
    ) {
      return {
        ...state,
        selectedCompany: null,
        nextStep: 1,
      };
    } else {
      return {
        ...state,
        selectedCompany: action.payload,
        nextStep: state.selectedCandidate ? 2 : 1,
      };
    }
  }
  if (action.type === "BACK_BTN_CLICK") {
    if (state.currentStep !== 0)
      return { ...state, currentStep: state.currentStep - 1 };
  }
  if (action.type === "NEXT_BTN_CLICK") {
    return { ...state, currentStep: state.currentStep + 1 }; // no next btn in form
  }
  if (action.type === "STEP_CLICK") {
    // change currentStep only if going back or going 1 step forward
    if (state.nextStep >= action.step) {
      return { ...state, currentStep: action.step };
    }
  }
  if (action.type === "FETCHED_CANDIDATES") {
    return { ...state, candidates: action.payload, loadingCandidates: false };
  }
  if (action.type === "FETCHED_COMPANIES") {
    return { ...state, companies: action.payload, loadingCompanies: false };
  }
  if (action.type === "FETCHED_REPORT") {
    return {
      ...state,
      editedReport: action.payload,
      loadingReport: false,
    };
  }
  if (action.type === "NO_REPORT_TO_FETCH") {
    return { ...state, loadingReport: false };
  }
  if (action.type === "LOAD_EDITED_REPORT_DATA") {
    return {
      ...state,
      selectedCandidate: state.candidates.find(
        (c) => c.id === state.editedReport.candidateId
      ),
      selectedCompany: state.companies.find(
        (c) => c.id === state.editedReport.companyId
      ),
      nextStep: 2,
      currentStep: 2, // go to form as default, can always go back
    };
  }
  return defaultWizState;
};

export const WizContextProvider = (props) => {
  // if id !== 0 you are editing a report, not creating it
  const { id } = useParams();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [wizState, dispatchWizAction] = useReducer(wizReducer, defaultWizState);

  useEffect(() => {
    if (+id !== 0) {
      ReportCommunicator.getById(+id)
        .then((data) => {
          console.log("report: ", data);
          dispatchWizAction({ type: "FETCHED_REPORT", payload: data });
        })
        .catch((error) => {
          setError(error.message);
          if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
        });
    } else {
      dispatchWizAction({ type: "NO_REPORT_TO_FETCH" });
    }
  }, []);

  useEffect(() => {
    CandidateCommunicator.getAll()
      .then((data) => {
        console.log("items: ", data);
        dispatchWizAction({ type: "FETCHED_CANDIDATES", payload: data });
      })
      .catch((error) => {
        setError(error.message);
        if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
      });
  }, []);

  useEffect(() => {
    CompanyCommunicator.getAll()
      .then((data) => {
        console.log("items: ", data);
        dispatchWizAction({ type: "FETCHED_COMPANIES", payload: data });
      })
      .catch((error) => {
        setError(error.message);
        if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
      });
  }, []);

  useEffect(() => {
    if (
      !wizState.loadingCandidates &&
      !wizState.loadingCompanies &&
      !wizState.loadingReport
    ) {
      setLoading(false);
      if (wizState.editedReport) {
        dispatchWizAction({ type: "LOAD_EDITED_REPORT_DATA" });
      }
    }
  }, [
    wizState.loadingCandidates,
    wizState.loadingCompanies,
    wizState.loadingReport,
    wizState.editedReport,
  ]);

  const handleSelectCandidate = (candidate) => {
    dispatchWizAction({ type: "SELECT_CANDIDATE", payload: candidate });
  };

  const handleSelectCompany = (company) => {
    dispatchWizAction({ type: "SELECT_COMPANY", payload: company });
  };

  const handleBackBtnClick = () => {
    dispatchWizAction({ type: "BACK_BTN_CLICK" });
  };

  const handleNextBtnClick = () => {
    dispatchWizAction({ type: "NEXT_BTN_CLICK" });
  };

  const handleStepClick = (step) => {
    dispatchWizAction({ type: "STEP_CLICK", step: step });
  };

  const handleFormSubmit = (formInput) => {
    const { interviewDate, phase, status, note } = formInput;
    const selectedData = {
      candidateId: wizState.selectedCandidate.id,
      candidateName: wizState.selectedCandidate.name,
      companyId: wizState.selectedCompany.id,
      companyName: wizState.selectedCompany.name,
    };
    const reportData = { ...selectedData, interviewDate, phase, status, note };
    if (wizState.editedReport) reportData.id = +wizState.editedReport.id;
    console.log("reportData: ", reportData);
    ReportCommunicator.save(reportData)
      .then((response) => console.log(response))
      .then(history.push("/admin"))
      .catch((error) => {
        setError(error.message);
        if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
      });
  };

  return (
    <WizContext.Provider
      value={
        {
          selectedCandidate: wizState.selectedCandidate,
          selectedCompany: wizState.selectedCompany,
          currentStep: wizState.currentStep,
          nextStep: wizState.nextStep,
          candidates: wizState.candidates,
          companies: wizState.companies,
          editedReport: wizState.editedReport,
          // outside of the reducer:
          error: error,
          loading: loading,
          onSelectCandidate: handleSelectCandidate,
          onSelectCompany: handleSelectCompany,
          onBackBtnClick: handleBackBtnClick,
          onNextBtnClick: handleNextBtnClick,
          onStepClick: handleStepClick,
          onFormSubmit: handleFormSubmit,
        }
      }
    >
      {props.children}
    </WizContext.Provider>)
}

export default WizContext;