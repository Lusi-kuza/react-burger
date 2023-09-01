import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import { modalOverlayPropTypes } from "../../../utils/types";

const ModalOverlay = ({ closeModal }) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={closeModal}></div>
  );
};

ModalOverlay.propType = modalOverlayPropTypes;

export { ModalOverlay };
