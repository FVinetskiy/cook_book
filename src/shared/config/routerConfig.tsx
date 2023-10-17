import DetailPage from "../../pages/DetailPage";
import Login from "../../pages/Login";
import MainPage from "../../pages/MainPage";
import Profile from "../../pages/Profile";

type PropsRoute = {
  path: string;
  element: JSX.Element;
};

export enum AppRoutes {
  MAIN = "main",
  DETAILS = "details",
  LOGIN = "login",
  PROFILE = "profile",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.DETAILS]: "/details",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.PROFILE]: "/profile",
};

export const routerConfig: Record<AppRoutes, PropsRoute> = {
  [AppRoutes.MAIN]: {
    path: RouterPath.main,
    element: <MainPage />,
  },
  [AppRoutes.DETAILS]: {
    path: RouterPath.details,
    element: <DetailPage />,
  },
  [AppRoutes.LOGIN]: {
    path: RouterPath.login,
    element: <Login />,
  },
  [AppRoutes.PROFILE]: {
    path: RouterPath.profile,
    element: <Profile />,
  },
};
