import Login from "../../pages/Login";
import MainPage from "../../pages/MainPage";
import NotFound from "../../pages/NotFound";
import Profile from "../../pages/Profile";

type PropsRoute = {
  path: string;
  element: JSX.Element;
};

export enum AppRoutes {
  MAIN = "main",
  LOGIN = "login",
  PROFILE = "profile",
  NOTFOUND = "notfound",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.PROFILE]: "/profile",
  [AppRoutes.NOTFOUND]: "*",
};

export const routerConfig: Record<AppRoutes, PropsRoute> = {
  [AppRoutes.MAIN]: {
    path: RouterPath.main,
    element: <MainPage />,
  },
  [AppRoutes.LOGIN]: {
    path: RouterPath.login,
    element: <Login />,
  },
  [AppRoutes.PROFILE]: {
    path: RouterPath.profile,
    element: <Profile />,
  },
  [AppRoutes.NOTFOUND]: {
    path: RouterPath.notfound,
    element: <NotFound />,
  },
};
