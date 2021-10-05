import ImageGuaranteed from "./UI/ImageGuaranteed";
import { PLACEHOLDER_IMG } from "../shared/constants";
import { Col, Card } from "react-bootstrap";
import styles from "./CandidateCard.module.css";

const CandidateCard = (props) => {
  const { candidate } = props;
  return (
    <Col sm={6} md={4} lg={3} xl={2} className="my-2 ">
      <Card className={styles.candidateCard}>
        <ImageGuaranteed
          preferredImg={candidate.avatar}
          placeholderImg={PLACEHOLDER_IMG}
          preferredImgAlt={candidate.name}
          alt="avatar"
        />
        <h6 className={styles.name}>{candidate.name}</h6>
        <p className={styles.email}>{candidate.email}</p>
      </Card>
    </Col>
  );
};

export default CandidateCard;
