import React from "react";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/burger-icon";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/list-icon";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/profile-icon";

import headerStyles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={`${headerStyles.header} pt-4 pb-4 ml-10 mr-10`}>
      <nav className={headerStyles.nav}>
        <div className={headerStyles.menu_left_block}>
          <a
            href="#"
            className={`${headerStyles.menu_item} pt-4 pr-5 pb-4 pl-5 `}
          >
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default text_color_primary pl-2">
              Конструктор
            </p>
          </a>
          <a
            href="#"
            className={`${headerStyles.menu_item} pt-4 pr-5 pb-4 pl-5 `}
          >
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive pl-2">
              Лента заказов
            </p>
          </a>
        </div>
        <div className={headerStyles.menu_logo}>
          <Logo />
        </div>
        <div className={headerStyles.menu_right_block}>
          <a
            href="#"
            className={`${headerStyles.menu_item} pt-4 pr-5 pb-4 pl-5 `}
          >
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive pl-2">
              Личный кабинет
            </p>
          </a>
        </div>
      </nav>
    </header>
  );
};

export { AppHeader };
