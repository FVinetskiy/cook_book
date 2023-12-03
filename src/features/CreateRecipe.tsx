import { Button } from "@consta/uikit/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../app/App";
import ControlledTextField from "../widgets/ControlledTextField/ControlledTextField";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { userState } from "../app/redux/slices/authSlice";
import { ChoiceGroup } from "@consta/uikit/ChoiceGroup";
import { FC, useState } from "react";
import { addNotification } from "../app/redux/slices/notificationsSlice";
import { useDispatch } from "react-redux";

type InputsCreate = {
  text: string;
  name: string;
  basicIngredients: string;
  creator: string;
  complexity: number;
};

type Item = string;

interface ICreateRecipe {
  onClose: (arg: boolean) => void;
}

const CreateRecipe: FC<ICreateRecipe> = ({ onClose }) => {
  const dispatch = useDispatch();
  const ingredients: Item[] = ["картошка", "петрушка", "морковка", "лук", "редиска"];
  const complexity: Item[] = ["лёгкий", "нормальный", "сложный"];
  const initialStateComplexity = complexity[0];
  const initialIngredients = [ingredients[0]];

  const [valueIngredients, setIngredients] = useState<any>(initialIngredients);
  const [valueComplexity, setComplexity] = useState<any>(initialStateComplexity);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<InputsCreate>({ mode: "onChange" });

  const user = useSelector(userState);

  const createTodo = async (data: any) => {
    await addDoc(collection(db, "cookbook"), {
      text: data.text,
      name: data.description,
      basicIngredients: valueIngredients,
      creator: user.user?.email,
      complexity: valueComplexity,
    });
    dispatch(
      addNotification({
        key: "1",
        message: "Рецепт добавлен",
        status: "normal",
        autoClose: 4,
      }),
    );
    reset();
    onClose(false);
  };

  return (
    <form onSubmit={handleSubmit(createTodo)}>
      <ControlledTextField
        placeholder={"Введите наименование рецепта"}
        name="text"
        type="text"
        control={control}
        rules={{
          required: "Заполните это поле",
        }}
      />
      <ControlledTextField
        placeholder={"Опишите рецепт"}
        name="description"
        type="textarea"
        rows={3}
        control={control}
        rules={{
          required: "Заполните это поле",
        }}
      />
      <ChoiceGroup
        style={{ marginBottom: 24 }}
        value={valueIngredients}
        onChange={({ value }) => setIngredients(value)}
        items={ingredients}
        getItemLabel={item => item}
        multiple
        name="ingredients"
      />
      <ChoiceGroup
        style={{ marginBottom: 24 }}
        value={valueComplexity}
        onChange={({ value }) => setComplexity(value)}
        items={complexity}
        getItemLabel={item => item}
        name="complexity"
        multiple={false}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button disabled={!isDirty || !isValid} type="submit" label="создать рецепт" />
        <Button type="button" label="закрыть" onClick={() => onClose(false)} />
      </div>
    </form>
  );
};

export default CreateRecipe;
