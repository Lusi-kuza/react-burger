import React, { useState } from "react";
import registerPageStyle from "./register.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/email-input";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/password-input";
import { AuthForm } from "../../components/account/auth-form/auth-form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/form/actions";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(registerUser(formValue));
  };

  return (
    <div>
      <div className={registerPageStyle.content}>
        <AuthForm
          titleForm="Регистрация"
          titleButton="Зарегистрироваться"
          submitForm={submitForm}
        >
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleInputChange}
            value={formValue.name}
            name={"name"}
            size={"default"}
          />
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

        <div className={`${registerPageStyle.actions} text_type_main-default`}>
          <p className="text_color_inactive">Уже зарегистрированы?</p>
          <Link
            to="/login"
            className={`${registerPageStyle.link} text_color_accent`}
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export { RegisterPage };
