import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@consta/uikit/Button";
import { Layout } from "@consta/uikit/Layout";
import ControlledTextField from "../widgets/ControlledTextField";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../app/redux/slices/notificationsSlice";
import { userState } from "../app/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

type Inputs = {
  mail: string;
  password: string;
};

const RegOrAuthorization: FC = () => {
  const dispatch = useDispatch();
  const [isRegForm, setIsRegForm] = useState(false);
  const { isAuth } = useSelector(userState);
  const navigate = useNavigate();

  const auth = getAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmitRegistration: SubmitHandler<Inputs> = async (data) => {
    if (isRegForm) {
      try {
        await createUserWithEmailAndPassword(auth, data.mail, data.password);
        dispatch(
          add({
            key: "1",
            message: "Вы успешно зарегистрировались",
            status: "normal",
            autoClose: 4,
          })
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          dispatch(
            add({
              key: "1",
              message: `${error?.message}`,
              status: "alert",
              autoClose: 4,
            })
          );
        }
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, data.mail, data.password);
        dispatch(
          add({
            key: "1",
            message: "Вы успешно авторизовались",
            status: "normal",
            autoClose: 4,
          })
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          dispatch(
            add({
              key: "1",
              message: `${error?.message}`,
              status: "alert",
              autoClose: 4,
            })
          );
        }
      }
    }
    reset();
  };

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmitRegistration)}>
      <ControlledTextField
        placeholder={"Введите адрес электронной почты"}
        name="mail"
        type="text"
        control={control}
        rules={{
          required: "Заполните это поле",
          pattern: {
            value:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Введите адрес почты корректно",
          },
        }}
      />

      <ControlledTextField
        placeholder={"Введите пароль"}
        name="password"
        type="password"
        control={control}
        rules={{
          required: "Заполните это поле",
          minLength: {
            value: 6,
            message: "минимальная длина 6 символов",
          },
        }}
      />

      <Layout direction="row">
        <Layout flex={1} style={{ marginRight: 24 }}>
          <Button
            width="full"
            type="submit"
            onClick={() => setIsRegForm(false)}
            label="auth"
            disabled={!isDirty || !isValid || isAuth}
          />
        </Layout>
        <Layout flex={1}>
          <Button
            width="full"
            type="submit"
            onClick={() => setIsRegForm(true)}
            label=" reg"
            disabled={!isDirty || !isValid || isAuth}
          />
        </Layout>
      </Layout>
    </form>
  );
};

export default RegOrAuthorization;
