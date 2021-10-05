import React from "react";
import { useParams } from "react-router";
import styles from "./CandidateReports.module.css";

export default function CandidateReports(props) {
  let { id } = useParams();
  return <h1>{`Reports Page for candidate id# ${id}`}</h1>;
}
