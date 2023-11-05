import { Navigate, useLocation } from "react-router-dom";
import { Preloader } from "../preloader/preloader";
import { useSelector } from "../../services/reducer";

type TOnlyUnAuthUserProps = {
  component: JSX.Element;
};

type TProtectedProps = TOnlyUnAuthUserProps & {
  onlyUnAuthUser?: boolean;
  check?: boolean;
};

const Protected = ({
  onlyUnAuthUser = false,
  check = false,
  component,
}: TProtectedProps): JSX.Element => {
  const isAuthChecked = useSelector((store) => store.form.isAuthChecked);

  const user = useSelector((store) => store.form.user);

  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuthUser && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuthUser && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (
    onlyUnAuthUser &&
    !user &&
    check &&
    (!location.state || location.state.pathname !== "/forgot-password")
  ) {
    return <Navigate to="/forgot-password" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuthUser = Protected;
export const OnlyUnAuthUser = ({ component }: TOnlyUnAuthUserProps) => {
  return <Protected onlyUnAuthUser={true} component={component} />;
};
export const OnlyUnAuthUserWithCheck = ({
  component,
}: TOnlyUnAuthUserProps) => {
  return <Protected onlyUnAuthUser={true} component={component} check={true} />;
};
