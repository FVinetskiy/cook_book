import { FC, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "@consta/uikit/Button";
import { useDispatch, useSelector } from "react-redux";
import { geIsAuth, getCurrentUser, isAuthState, userState } from "../../app/redux/slices/authSlice";
import { NavLink } from "react-router-dom";
import { Badge } from "@consta/uikit/Badge";
import "./LayoutHeader.scss";

const LayoutHeader: FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthState);
  const user = useSelector(userState);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        dispatch(getCurrentUser(user));
        dispatch(geIsAuth(true));
      } else {
        dispatch(geIsAuth(false));
        dispatch(getCurrentUser(null));
      }
    });
  }, [auth, dispatch]);

  return (
    <>
      <header className="header">
        <div className="header__wrap-logo">
          <h2 style={{ marginRight: "10px" }}>Логотип</h2>
          <NavLink to="/">
            <Badge status="normal" label="главная" />
          </NavLink>
          {!isAuth ? (
            <>
              <NavLink to="/login">
                <Badge status="normal" label="логин" />
              </NavLink>
            </>
          ) : (
            <NavLink to="/profile">
              <Badge status="normal" label="личный профиль" />
            </NavLink>
          )}
        </div>
        <div>
          {isAuth ? (
            <span style={{ marginRight: "10px" }}>{user.user?.email}</span>
          ) : (
            <span style={{ marginRight: "10px" }}>вы не авторизованы</span>
          )}
          <Button disabled={!isAuth} size="xs" onClick={() => signOut(auth)} label="Выйти" />
        </div>
      </header>
    </>
  );
};

export default LayoutHeader;
