import React, { useContext, useReducer, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReportCommunicator from "../services/ReportCommunicator";
import CandidateCommunicator from "../services/CandidateCommunicator";
import CompanyCommunicator from "../services/CompanyCommunicator";

import { Row, Col, ProgressBar } from "react-bootstrap";
import WizardSteps from "../components/wiz/WizardSteps";
import WizSelect from "../components/wiz/WizSelect";
import WizCandidateCard from "../components/wiz/WizCandidateCard";
import WizCompanyCard from "../components/wiz/WizCompanyCard";
import WizReportForm from "../components/wiz/WizReportForm";
import WizSelectedInfo from "../components/wiz/WizSelectedInfo";
import AuthContext from "../store/auth-context";
import { SESSION_EXPIRED } from "../shared/constants";

import styles from "./Wizard.module.css";
import ErrorDisplay from "../components/ErrorDisplay";
import LoaderRipple from "../components/UI/LoaderRipple";

const defaultWizState = {
  selectedCandidate: null,
  selectedCompany: null,
  currentStep: 0, // currently active step, can already have input
  nextStep: 0, // next step where no input was provided by user
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
  return defaultWizState;
};

export default function Wizard(props) {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState("");
  const [wizState, dispatchWizAction] = useReducer(wizReducer, defaultWizState);

  const [candidates, setCandidates] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [loadingReport, setLoadingReport] = useState(true);

  // if id !== 0 you are editing a report, not creating it
  const { id } = useParams();
  const [selectedReport, setSelectedReport] = useState(null);
  useEffect(() => {
    if (+id !== 0) {
      ReportCommunicator.getById(+id)
        .then((data) => {
          console.log("report: ", data);
          setSelectedReport(data); // TODO: find a way to update wizState for
          // candidate & company from selectedReport (you only have the ids, not
          // the entire objects)
        })
        .catch((error) => {
          setError(error.message);
          if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
        })
        .finally(() => {
          setLoadingReport(false);
        });
    } else {
      setLoadingReport(false);
    }
  }, []);

  useEffect(() => {
    CandidateCommunicator.getAll()
      .then((data) => {
        console.log("items: ", data);
        setCandidates(data);
      })
      .catch((error) => {
        setError(error.message);
        if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
      })
      .finally(setLoadingCandidates(false));
  }, []);

  useEffect(() => {
    CompanyCommunicator.getAll()
      .then((data) => {
        console.log("items: ", data);
        setCompanies(data);
      })
      .catch((error) => {
        setError(error.message);
        if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
      })
      .finally(setLoadingCompanies(false));
  }, []);

  useEffect(() => {
    if (!loadingCandidates && !loadingCompanies && !loadingReport) {
      if (selectedReport && candidates.length !== 0 && companies.length !== 0) {
        console.log("Cand id: ", selectedReport.candidateId);
        console.log("candidates before find: ", candidates);
        const candidate = candidates.find(
          (c) => c.id == selectedReport.candidateId
        );
        const company = companies.find((c) => c.id == selectedReport.companyId);
        console.log(
          "Selected report: ",
          selectedReport,
          " selectedCandidate ",
          candidate
        );
        dispatchWizAction({
          type: "SELECT_CANDIDATE",
          payload: candidate,
        });
        dispatchWizAction({ type: "SELECT_COMPANY", payload: company });
      }
    }
  }, [
    loadingCandidates,
    loadingCompanies,
    loadingReport,
    selectedReport,
    companies,
    candidates,
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
    if (selectedReport) reportData.id = +selectedReport.id;
    console.log("reportData: ", reportData);
    ReportCommunicator.save(reportData)
      .then((response) => console.log(response))
      .then(history.push("/admin"))
      .catch((error) => {
        setError(error.message);
        if (error.message === SESSION_EXPIRED) authCtx.onSessionExpired();
      });
  };

  const sharedSelectProps = {
    currentStep: wizState.currentStep,
    onBackBtnClick: handleBackBtnClick,
    onNextBtnClick: handleNextBtnClick,
  };

  if (error) return <ErrorDisplay message={error} />;
  if (loadingCandidates || loadingCompanies || loadingReport)
    return <LoaderRipple />;

  return (
    <Row className="mt-4  m-0">
      <Col sm={3} lg={2} className={styles.stepsDiv}>
        <WizardSteps
          currentStep={wizState.currentStep}
          nextStep={wizState.nextStep}
          onClick={handleStepClick}
        />
        <div className="text-center my-4" style={{ width: "100%" }}>
          <ProgressBar max="3" now={wizState.currentStep + 1} variant="dark" />
        </div>
        <WizSelectedInfo
          candidateName={
            wizState.selectedCandidate ? wizState.selectedCandidate.name : ""
          }
          companyName={
            wizState.selectedCompany ? wizState.selectedCompany.name : ""
          }
        />
      </Col>
      <Col sm={8} className={styles.optionsDiv}>
        {wizState.currentStep === 0 && (
          <WizSelect
            onSelectItem={handleSelectCandidate}
            items={candidates}
            ItemCard={WizCandidateCard}
            selected={wizState.selectedCandidate}
            {...sharedSelectProps}
          />
        )}
        {wizState.currentStep === 1 && (
          <WizSelect
            onSelectItem={handleSelectCompany}
            items={companies}
            ItemCard={WizCompanyCard}
            selected={wizState.selectedCompany}
            {...sharedSelectProps}
          />
        )}
        {wizState.currentStep === 2 && (
          <WizReportForm
            onBackBtnClick={handleBackBtnClick}
            onSubmit={handleFormSubmit}
            selectedReport={selectedReport}
          />
        )}
      </Col>
    </Row>
  );
}
