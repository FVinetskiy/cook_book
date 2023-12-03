import { useMemo } from "react";
import BtnCellRenderer from "./BtnCellRenderer";
import Ingredients from "./Ingredients";

type TListComplex = {
  [key: string]: string;
};

const detectСomplexity = (complexity: string) => {
  const complexitys: TListComplex = {
    сложный: "red",
    лёгкий: "white",
    нормальный: "green",
  };
  return complexitys[complexity];
};

export const useDataRecipesTable = () => {
  const columns = useMemo(
    () => [
      {
        headerName: "",
        field: "",
        cellRenderer: BtnCellRenderer,
        width: 75,
        suppressMovable: true,
      },
      {
        headerName: "наименование",
        field: "text",
        width: 120,
        cellStyle: { overflow: "auto", color: "deepskyblue" },
      },
      {
        headerName: "описание рецепта",
        field: "name",
        width: 230,
        wrapText: true,
        autoHeight: true,
      },
      {
        headerName: "список ингредиентов",
        field: "basicIngredients",
        width: 140,
        wrapText: true,
        flex: 1,
        cellRenderer: Ingredients,
      },
      {
        headerName: "сложность приготовления",
        field: "complexity",
        minWidth: 175,
        flex: 1,
        cellStyle: (params: any) => {
          const style = detectСomplexity(params.value);
          return { color: `${style}` };
        },
      },
      {
        headerName: "автор рецепта",
        field: "creator",
        minWidth: 100,
        flex: 1,
      },
    ],
    [],
  );

  return {
    columns,
  };
};
