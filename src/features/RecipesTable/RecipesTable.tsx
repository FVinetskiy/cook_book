import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { agGridAdapter } from "@consta/ag-grid-adapter/agGridAdapter";
import { useCallback, useMemo, useRef } from "react";
import { GridReadyEvent } from "ag-grid-community";
import { useDataRecipesTable } from "./useDataRecipesTable";

const RecipesTable = ({ rowData }: any) => {
  const gridRef = useRef<AgGridReact>(null);

  const styleOptions = agGridAdapter({
    size: "m",
    borderBetweenColumns: true,
    borderBetweenRows: true,
    headerVerticalAlign: "center",
    headerView: "default",
    verticalAlign: "center",
    rowHeight: 200,
  });

  const { columns } = useDataRecipesTable();

  const onGridReady = useCallback((event: GridReadyEvent) => {
    event.api.sizeColumnsToFit();
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
    };
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: 996, position: "relative", zIndex: 0 }}>
      <AgGridReact
        {...styleOptions}
        onGridReady={onGridReady}
        overlayNoRowsTemplate="Нет данных"
        rowData={rowData}
        columnDefs={columns}
        ref={gridRef}
        animateRows
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default RecipesTable;
