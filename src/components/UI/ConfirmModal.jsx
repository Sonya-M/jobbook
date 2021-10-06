import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";

import styles from "./ConfirmModal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCancel} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.smallModal}>
      <header className={styles.header}>
        <Button variant="small" onClick={props.onCancel}>
          X
        </Button>
      </header>
      <div className={styles.content}>{props.content}</div>
      <footer className={styles.actions}>
        <Button className="btn-secondary" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button onClick={props.onConfirm}>Confirm</Button>
      </footer>
    </div>
  );
};

const ConfirmModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        // onClick={props.onClick}` since we look for `props.onClick`
        // inside of the Backdrop
        <Backdrop onCancel={props.onCancel} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          content={props.content}
          onCancel={props.onCancel}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ConfirmModal;
