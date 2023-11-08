import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import profileFormStyle from "./profile-form.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/email-input";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/password-input";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

import { updateUserInfo } from "../../../services/form/actions";
import { TForm } from "../../../utils/types";
import { useDispatch, useSelector } from "../../../services/reducer";

const ProfileForm = (): JSX.Element => {
  const dispatch = useDispatch();

  const { email, name } = useSelector((store) => store.form.user!);

  const initialFormValue: TForm = {
    email: email,
    password: "",
    name: name,
  };

  const [formValue, setFormValue] = useState<TForm>(initialFormValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const resetChange = () => {
    setFormValue(initialFormValue);
  };

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserInfo(formValue));
  };

  let isHasChanged =
    JSON.stringify(initialFormValue) === JSON.stringify(formValue);

  return (
    <form className={profileFormStyle.form} onSubmit={submitForm}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleInputChange}
        value={formValue.name}
        name={"name"}
        size={"default"}
        icon="EditIcon"
      />
      <EmailInput
        onChange={handleInputChange}
        value={formValue.email}
        name={"email"}
        isIcon={true}
        placeholder="Логин"
      />

      <PasswordInput
        onChange={handleInputChange}
        value={formValue.password}
        name={"password"}
        icon="EditIcon"
      />
      {!isHasChanged && (
        <div className={profileFormStyle.actions}>
          <Button
            htmlType="reset"
            type="secondary"
            size="medium"
            onClick={resetChange}
            extraClass="pl-2 pr-2"
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export { ProfileForm };
