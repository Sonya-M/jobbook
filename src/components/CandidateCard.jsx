import { Col, Card } from "react-bootstrap";
import styles from "./CandidateCard.module.css";

const CandidateCard = (props) => {
  return (
    <Col sm={6} md={4} lg={3} xl={2} className="my-2 ">
      <Card className={styles.candidateCard}>
        <img src={props.candidate.avatar}></img>
        <h6 className={styles.name}>{props.candidate.name}</h6>
        <p className={styles.email}>{props.candidate.email}</p>
      </Card>
    </Col>
  );
};

export default CandidateCard;
