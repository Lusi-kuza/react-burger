import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import forgotPasswordStyle from "./forgot-password.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/email-input";
import { AuthForm } from "../../components/account/auth-form/auth-form";
import { Link, Navigate, useLocation } from "react-router-dom";

import { getPassword } from "../../services/form/actions";
import { useDispatch, useSelector } from "../../services/reducer";

const ForgotPasswordPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isPasswordReceived = useSelector(
    (store) => store.form.isPasswordReceived
  );

  const [formValue, setFormValue] = useState({
    email: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ email: e.target.value });
  };

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(getPassword(formValue));
  };

  if (isPasswordReceived) {
    return <Navigate to="/reset-password" state={location} />;
  }

  return (
    <div>
      <div className={forgotPasswordStyle.content}>
        <AuthForm
          titleForm="Восстановление пароля"
          titleButton="Восстановить"
          submitForm={submitForm}
        >
          <EmailInput
            onChange={handleInputChange}
            value={formValue.email}
            name={"email"}
            isIcon={false}
            placeholder={"Укажите e-mail"}
          />
        </AuthForm>

        <div className={forgotPasswordStyle.actions}>
          <p>Вспомнили пароль?</p>
          <Link to="/login" className={forgotPasswordStyle.link}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export { ForgotPasswordPage };
