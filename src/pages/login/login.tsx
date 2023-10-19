import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import loginPageStyle from "./login.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/email-input";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/password-input";
import { AuthForm } from "../../components/account/auth-form/auth-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/form/actions";

const LoginPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector(
    //@ts-ignore
    (store) => store.form.user
  );

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(loginUser(formValue));
  };

  const { from } = location.state || { from: { pathname: "/" } };

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div>
      <div className={loginPageStyle.content}>
        <AuthForm titleForm="Вход" titleButton="Войти" submitForm={submitForm}>
          <EmailInput
            onChange={handleInputChange}
            value={formValue.email}
            name={"email"}
            isIcon={false}
          />
          <PasswordInput
            onChange={handleInputChange}
            value={formValue.password}
            name={"password"}
          />
        </AuthForm>
        <div
          className={`${loginPageStyle.additional_actions} text_type_main-default`}
        >
          <div className={loginPageStyle.actions}>
            <p className="text_color_inactive">Вы - новый пользователь?</p>
            <Link
              to="/register"
              className={`${loginPageStyle.link} text_color_accent`}
            >
              Зарегистрироваться
            </Link>
          </div>
          <div className={loginPageStyle.actions}>
            <p className="text_color_inactive">Забыли пароль?</p>
            <Link
              to="/forgot-password"
              className={`${loginPageStyle.link} text_color_accent`}
            >
              Восстановить пароль
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
