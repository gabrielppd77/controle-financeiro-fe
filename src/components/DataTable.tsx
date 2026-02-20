import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import type {
  GridRowsProp,
  GridColDef,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Box, LinearProgress } from "@mui/material";

interface DataTableProps<TData extends GridValidRowModel> {
  data?: GridRowsProp<TData>;
  columns: GridColDef<TData>[];
  isLoading: boolean;
  isFetching: boolean;
}

export default function DataTable<TData extends GridValidRowModel>({
  data,
  columns,
  isLoading,
  isFetching,
}: DataTableProps<TData>) {
  const apiRef = useGridApiRef();

  return (
    <Box sx={{ height: "100%" }}>
      <LinearProgress
        sx={{
          display: isFetching ? "block" : "none",
        }}
      />
      <DataGrid
        apiRef={apiRef}
        loading={isLoading}
        columns={columns}
        rows={data}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        density="compact"
        disableColumnMenu
        disableVirtualization
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50, 100]}
        localeText={{
          noRowsLabel: "Sem dados",
          footerRowSelected: (count) =>
            count !== 1
              ? `${count.toLocaleString()} linhas selecionadas`
              : `${count.toLocaleString()} linha selecionada`,
          paginationRowsPerPage: "Linhas por página",
          paginationDisplayedRows: ({ from, to, count }) =>
            `${from}-${to} de ${count}`,
        }}
      />
    </Box>
  );
}
