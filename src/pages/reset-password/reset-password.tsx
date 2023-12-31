import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import resetPasswordStyle from "./reset-password.module.css";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/password-input";
import { AuthForm } from "../../components/account/auth-form/auth-form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { Link, Navigate } from "react-router-dom";
import { resetPassword } from "../../services/form/actions";
import { useDispatch, useSelector } from "../../services/reducer";

const ResetPasswordPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const isPasswordReceived = useSelector(
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

        <div className={resetPasswordStyle.actions}>
          <p>Вспомнили пароль?</p>
          <Link to="/login" className={resetPasswordStyle.link}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export { ResetPasswordPage };
