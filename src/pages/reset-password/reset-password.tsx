import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import resetPasswordStyle from "./reset-password.module.css";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/password-input";
import { AuthForm } from "../../components/account/auth-form/auth-form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/form/actions";

const ResetPasswordPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const isPasswordReceived = useSelector(
    //@ts-ignore
    (store) => store.form.isPasswordReceived
  );

  const [formValue, setFormValue] = useState({
    password: "",
    token: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(resetPassword(formValue));
  };

  if (!isPasswordReceived) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <div className={resetPasswordStyle.content}>
        <AuthForm
          titleForm="Восстановление пароля"
          titleButton="Сохранить"
          submitForm={submitForm}
        >
          <PasswordInput
            onChange={handleInputChange}
            value={formValue.password}
            name={"password"}
            placeholder={"Введите новый пароль"}
          />

          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleInputChange}
            value={formValue.token}
            name={"token"}
            size={"default"}
          />
        </AuthForm>

        <div className={`${resetPasswordStyle.actions} text_type_main-default`}>
          <p className="text_color_inactive">Вспомнили пароль?</p>
          <Link
            to="/login"
            className={`${resetPasswordStyle.link} text_color_accent`}
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export { ResetPasswordPage };
