import React from "react";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/burger-icon";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/list-icon";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/profile-icon";

import headerStyles from "./app-header.module.css";
import { NavLink } from "react-router-dom";

const AppHeader = (): JSX.Element => {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <div className={headerStyles.menu_left_block}>
          <NavLink to="/" className={headerStyles.menu_item}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                <p
                  className={
                    isActive
                      ? headerStyles.menu_title_active
                      : headerStyles.menu_title_inactive
                  }
                >
                  Конструктор
                </p>
              </>
            )}
          </NavLink>
          <NavLink to="/feed" className={headerStyles.menu_item}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? "primary" : "secondary"} />
                <p
                  className={
                    isActive
                      ? headerStyles.menu_title_active
                      : headerStyles.menu_title_inactive
                  }
                >
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </div>
        <NavLink to="/" className={headerStyles.menu_logo}>
          <Logo />
        </NavLink>
        <div className={headerStyles.menu_right_block}>
          <NavLink to="/profile" className={headerStyles.menu_item}>
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? "primary" : "secondary"} />
                <p
                  className={
                    isActive
                      ? headerStyles.menu_title_active
                      : headerStyles.menu_title_inactive
                  }
                >
                  Личный кабинет
                </p>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export { AppHeader };
