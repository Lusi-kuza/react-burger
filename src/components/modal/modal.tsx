import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/close-icon";
import { ModalOverlay } from "./modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

type TModalProps = {
  title?: string;
  children: JSX.Element;
  closeModal: () => void;
};

const Modal = ({ title, children, closeModal }: TModalProps): JSX.Element => {
  useEffect(() => {
    const handlerCloseCard = (e: KeyboardEvent) => {
      if (e.code === "Escape") closeModal();
    };
    document.addEventListener("keydown", handlerCloseCard);
    return () => {
      document.removeEventListener("keydown", handlerCloseCard);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closeModal={closeModal} />
      <div className={modalStyles.modal}>
        <div className={modalStyles.title}>
          <p data-testid="modal">{title}</p>
          <div
            className={modalStyles.icon}
            data-testid="modalIcon"
            onClick={closeModal}
          >
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
    </>,
    modalRoot!
  );
};

export { Modal };
