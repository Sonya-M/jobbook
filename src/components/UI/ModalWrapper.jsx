import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";

import styles from "./ModalWrapper.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={`${styles.modal} ${props.small ? styles.small : ""}`}>
      <header className={styles.header}>
        {/* if no title, empty string for formatting */}
        <h2>{props.title ? props.title : ""}</h2>
        <Button variant="small" onClick={props.onClose}>
          X
        </Button>
      </header>
      <div className={styles.content}>{props.content}</div>
      {/* footer for additional buttons */}
      {props.footerContent ? <footer>{props.footerContent}</footer> : null}
    </div>
  );
};

const ModalWrapper = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          small={props.small}
          title={props.title}
          content={props.content}
          onClose={props.onClose}
          footerContent={props.footerContent}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ModalWrapper;
