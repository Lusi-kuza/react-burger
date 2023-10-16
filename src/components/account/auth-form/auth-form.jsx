import React from "react";
import authFormStyle from "./auth-form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { authFormPropTypes } from "../../../utils/types";

const AuthForm = ({ titleForm, titleButton, children, submitForm }) => {
  return (
    <form className={`${authFormStyle.form} `} onSubmit={(e) => submitForm(e)}>
      <p className="text_type_main-medium">{titleForm}</p>
      {children}
      <Button htmlType="submit" type="primary" size="medium">
        {titleButton}
      </Button>
    </form>
  );
};

AuthForm.propTypes = authFormPropTypes;

export { AuthForm };
