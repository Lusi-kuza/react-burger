import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

type TModalOverlayProps = {
  closeModal?: () => void;
};

const ModalOverlay = ({ closeModal }: TModalOverlayProps): JSX.Element => {
  return (
    <div
      className={modalOverlayStyles.overlay}
      onClick={closeModal}
      data-testid="modalOverlay"
    ></div>
  );
};

export { ModalOverlay };
