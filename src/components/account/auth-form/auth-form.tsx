import React, { SyntheticEvent } from "react";
import authFormStyle from "./auth-form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

type TAuthFormProps = {
  titleForm: string;
  titleButton: string;
  children: JSX.Element | Array<JSX.Element>;
  submitForm: (e: SyntheticEvent) => void;
};

const AuthForm = ({
  titleForm,
  titleButton,
  children,
  submitForm,
}: TAuthFormProps): JSX.Element => {
  return (
    <form className={`${authFormStyle.form} `} onSubmit={(e) => submitForm(e)}>
      <p className="text_type_main-medium" data-testid="titleAuthForm">
        {titleForm}
      </p>
      {children}
      <Button htmlType="submit" type="primary" size="medium">
        {titleButton}
      </Button>
    </form>
  );
};

export { AuthForm };
