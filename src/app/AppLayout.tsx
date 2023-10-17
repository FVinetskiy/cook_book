import { FC, Suspense } from "react";
import NotificationMessage from "../widgets/NotificationMessage";
import { Loader } from "@consta/uikit/Loader";
import LayoutHeader from "../widgets/LayoutHeader/LayoutHeader";
import { Route, Routes } from "react-router-dom";
import { routerConfig } from "../shared/config/routerConfig";

const AppLayout: FC = () => {
  return (
    <div className="container">
      <LayoutHeader />
      <Suspense fallback={<Loader size="m" />}>
        <Routes>
          {Object.values(routerConfig).map(({ element, path }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
      <NotificationMessage />
    </div>
  );
};

export default AppLayout;
