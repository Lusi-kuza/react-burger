import React, { useState } from "react";
import forgotPasswordStyle from "./forgot-password.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/email-input";
import { AuthForm } from "../../components/account/auth-form/auth-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPassword } from "../../services/form/actions";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isPasswordReceived = useSelector(
    (store) => store.form.isPasswordReceived
  );

  const [formValue, setFormValue] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    setFormValue({ email: e.target.value });
  };

  const submitForm = (e) => {
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

        <div
          className={`${forgotPasswordStyle.actions} text_type_main-default`}
        >
          <p className="text_color_inactive">Вспомнили пароль?</p>
          <Link
            to="/login"
            className={`${forgotPasswordStyle.link} text_color_accent`}
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export { ForgotPasswordPage };
