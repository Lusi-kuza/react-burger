import React from "react";
import preloaderStyles from "./preloader.module.css";
import { ModalOverlay } from "../modal/modal-overlay/modal-overlay";

const Preloader = (): JSX.Element => {
  return (
    <>
      <ModalOverlay />
      <div className={preloaderStyles.overlay}>
        <div className={preloaderStyles.loader}></div>
      </div>
    </>
  );
};

export { Preloader };
