import { Button } from "@consta/uikit/Button";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../app/App";

const BtnCellRenderer = (props: any) => {
  const { data } = props;

  const deleteRecipe = async (id: string) => {
    await deleteDoc(doc(db, "cookbook", id));
  };

  return <Button width="full" view="clear" label={"x"} onClick={() => deleteRecipe(data.id)} />;
};

export default BtnCellRenderer;
