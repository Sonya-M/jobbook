import React from "react";
import ModalWrapper from "./ModalWrapper";
import { Button } from "react-bootstrap";

import styles from "./ModalConfirmDialog.module.css";

export default function ModalConfirmDialog(props) {
  const footerContent = (
    <div className={styles.actions}>
      <Button className="btn-secondary" onClick={props.onCancel}>
        Cancel
      </Button>
      <Button onClick={props.onConfirm}>Confirm</Button>
    </div>
  );

  return (
    <ModalWrapper
      small={true}
      title={props.title}
      content={props.content}
      onClose={props.onCancel}
      footerContent={footerContent}
    />
  );
}
