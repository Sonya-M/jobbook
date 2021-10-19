import React from "react";
import ImageGuaranteed from "../UI/ImageGuaranteed";
import { PLACEHOLDER_IMG } from "../../shared/constants";
import { Row, Col, Table } from "react-bootstrap";
import styles from "./CandidateInfo.module.css";

export default function CandidateInfo(props) {
  const { candidate } = props;
  return (
    <Row
      className={`d-flex mx-1 align-items-center 
      justify-content-center`}
    >
      <Col sm={5}>
        <ImageGuaranteed
          className={styles.profileImg}
          preferredImg={candidate.avatar}
          placeholderImg={PLACEHOLDER_IMG}
          preferredImgAlt={candidate.name}
          alt="avatar"
        />
      </Col>
      <Col sm={7}>
        <div>
          <h2>{candidate.name}</h2>
          <Table>
            <tbody>
              <tr>
                <th>email</th>
                <td>{candidate.email}</td>
              </tr>
              <tr>
                <th>birthday</th>
                <td>{candidate.getBirthday()}</td>
              </tr>
              <tr>
                <th>education</th>
                <td>{candidate.education}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  );
}
