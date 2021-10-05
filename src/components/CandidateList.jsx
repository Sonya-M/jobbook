import React from "react";
import CandidateCard from "./CandidateCard";

import { Row } from "react-bootstrap";

export default function CandidateList(props) {
  return (
    <Row>
      {props.candidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} />
      ))}
    </Row>
  );
}
