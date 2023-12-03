import { FC, useEffect, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../app/App";
import RecipesTable from "../features/RecipesTable/RecipesTable";
import CreateRecipe from "../features/CreateRecipe";
import { Button } from "@consta/uikit/Button";
import { Modal } from "@consta/uikit/Modal";
import { useSelector } from "react-redux";
import { isAuthState } from "../app/redux/slices/authSlice";

const MainPage: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuth = useSelector(isAuthState);

  useEffect(() => {
    const q = query(collection(db, "cookbook"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data: any = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setRowData(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section>
      <div className="wrap-title">
        <Text size="3xl">Список рецептов</Text>
        <Button disabled={!isAuth} onClick={() => setIsModalOpen(true)} label="добавить рецепт" />
      </div>
      <Modal
        isOpen={isModalOpen}
        hasOverlay
        onClickOutside={() => setIsModalOpen(false)}
        onEsc={() => setIsModalOpen(false)}
      >
        <div className="modal-content">
          <CreateRecipe onClose={setIsModalOpen} />
        </div>
      </Modal>
      <RecipesTable rowData={rowData} />
    </section>
  );
};

export default MainPage;
