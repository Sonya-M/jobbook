import { Row, Col, ProgressBar } from "react-bootstrap";
import { useHistory } from "react-router";
import WizardSteps from "./WizardSteps";
import WizSelect from "./WizSelect";
import WizCandidateCard from "./WizCandidateCard";
import WizCompanyCard from "./WizCompanyCard";
import WizReportForm from "./WizReportForm";
import WizSelectedInfo from "./WizSelectedInfo";
import ErrorDisplay from "../ErrorDisplay";
import LoaderRipple from "../UI/LoaderRipple";
import WizContext from "../../store/wiz-context";
import { useContext } from "react";

import { Button } from "react-bootstrap";
import styles from "./WizardView.module.css";

export default function WizardView() {
  const ctx = useContext(WizContext);
  const history = useHistory();

  const handleCancel = () => {
    history.push("/admin");
  };

  if (ctx.error) return <ErrorDisplay message={ctx.error} />;
  if (ctx.loading) return <LoaderRipple />;

  return (
    <Row className="m-0">
      <Col sm={3} lg={2} className={styles.stepsDiv}>
        <WizardSteps />
        <div className="text-center my-4" style={{ width: "100%" }}>
          <ProgressBar max="3" now={ctx.currentStep + 1} variant="dark" />
          <Button size="sm" className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
        <WizSelectedInfo />
      </Col>
      <Col sm={8} className={styles.optionsDiv}>
        {ctx.currentStep === 0 && (
          <WizSelect
            onSelectItem={ctx.onSelectCandidate}
            items={ctx.candidates}
            ItemCard={WizCandidateCard}
            selected={ctx.selectedCandidate}
          />
        )}
        {ctx.currentStep === 1 && (
          <WizSelect
            onSelectItem={ctx.onSelectCompany}
            items={ctx.companies}
            ItemCard={WizCompanyCard}
            selected={ctx.selectedCompany}
          />
        )}
        {ctx.currentStep === 2 && <WizReportForm />}
      </Col>
    </Row>
  );
}
