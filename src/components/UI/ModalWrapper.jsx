import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";

import styles from "./ModalWrapper.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={`${props.small ? styles.smallModal : styles.modal}`}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
        <Button variant="small" onClick={props.onClick}>
          X
        </Button>
      </header>
      <div className={styles.content}>{props.content}</div>
      {/* <footer className={styles.actions}>
        <Button className="btn-secondary" onClick={props.onClick}>
          Okay
        </Button>
      </footer> */}
    </div>
  );
};

const ModalWrapper = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          content={props.content}
          onClick={props.onClick}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ModalWrapper;
