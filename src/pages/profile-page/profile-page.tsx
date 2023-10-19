import React, { SyntheticEvent, useEffect } from "react";
import profilePageStyle from "./profile-page.module.css";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { getUserInfo, logoutUser } from "../../services/form/actions";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();

  const content =
    location.pathname === "/profile"
      ? "изменить свои персональные данные"
      : location.pathname === "/profile/orders"
      ? "просмотреть свою историю заказов"
      : "просто выйти";

  const logoutProfile = (e: SyntheticEvent) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(logoutUser());
  };

  const user = useSelector(
    //@ts-ignore
    (store) => store.form.user
  );

  useEffect(() => {
    //@ts-ignore
    dispatch(getUserInfo());
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <div className={profilePageStyle.content}>
        <nav className={profilePageStyle.navigate}>
          <ul className={profilePageStyle.navigate_list}>
            <li className={profilePageStyle.navigate_item}>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? profilePageStyle.link_active
                    : profilePageStyle.link_inactive
                }
                end
              >
                Профиль
              </NavLink>
            </li>
            <li className={profilePageStyle.navigate_item}>
              <NavLink
                to="/profile/orders"
                className={({ isActive }) =>
                  isActive
                    ? profilePageStyle.link_active
                    : profilePageStyle.link_inactive
                }
              >
                История заказов
              </NavLink>
            </li>
            <li
              className={profilePageStyle.navigate_item}
              onClick={logoutProfile}
            >
              <NavLink className={profilePageStyle.link_inactive} to="/">
                Выход
              </NavLink>
            </li>
          </ul>
          <div className={profilePageStyle.info}>
            В этом разделе вы можете <br />
            {content}
          </div>
        </nav>
        {user && <Outlet />}
      </div>
    </div>
  );
};

export { ProfilePage };
