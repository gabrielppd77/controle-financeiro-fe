import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Chip } from "@mui/material";

import PageContainer from "../../components/PageContainer";
import DataTable from "../../components/DataTable";

import useFinancialEntriesList from "./data/useFinancialEntriesList";
import useFinancialEntriesDelete from "./data/useFinancialEntriesDelete";
import { useGoTo } from "@hooks/useGoTo";
import { confirmDelete } from "@libs/alert";
import { formatDateToShow, formatMoney } from "@utils";

import BoxColor from "@components/BoxColor";
import UploadCsvButton from "@components/UploadCsvButton";
import { useLancamentosFilterStore } from "@stores/lancamentosFilterStore";
import FormFilter from "./components/form-filter";

export default function Lancamentos() {
  const pageTitle = "Lançamentos";

  const { filters } = useLancamentosFilterStore();

  const { isNotConfirmed, ...restOfFilters } = filters;

  const { data, isLoading, isFetching } = useFinancialEntriesList({
    data: {
      ...restOfFilters,
      isConfirmed: isNotConfirmed === null ? null : !isNotConfirmed,
    },
  });

  const { mutateAsync } = useFinancialEntriesDelete();
  const { goToLancamentosForm } = useGoTo();

  const valueTotal = (data || []).reduce((pv, ct) => pv + ct.amount, 0);

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[{ title: pageTitle }]}
      actions={
        <Stack flexDirection="row" gap={1}>
          <UploadCsvButton />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => goToLancamentosForm()}
          >
            Adicionar
          </Button>
        </Stack>
      }
    >
      <FormFilter valueTotal={valueTotal} />

      <DataTable
        columns={[
          {
            field: "description",
            headerName: "Descrição",
            flex: 1,
          },
          {
            field: "date",
            headerName: "Data",
            valueFormatter: formatDateToShow,
          },
          {
            field: "amount",
            headerName: "Valor",
            align: "right",
            valueFormatter: formatMoney,
          },
          {
            field: "typeName",
            headerName: "Tipo",
            minWidth: 150,
            renderCell: ({ row }) => (
              <Box display="flex" alignItems="center" height="100%" gap={1}>
                {row.typeName}
                <BoxColor color={row.typeColor} fine />
              </Box>
            ),
          },
          {
            field: "classificationName",
            headerName: "Classificação",
            minWidth: 110,
            renderCell: ({ row }) => (
              <Chip
                label={row.classificationName}
                color={row.classification === "Expense" ? "error" : "success"}
                size="small"
              />
            ),
          },
          {
            field: "accountName",
            headerName: "Conta",
            minWidth: 150,
            renderCell: ({ row }) => (
              <Box display="flex" alignItems="center" height="100%" gap={1}>
                {row.accountName}
                <BoxColor color={row.accountColor} fine />
              </Box>
            ),
          },
          {
            field: "id",
            type: "actions",
            align: "right",
            getActions: ({ row }) => [
              <GridActionsCellItem
                key="edit-item"
                icon={<EditIcon />}
                label="Edit"
                onClick={() => goToLancamentosForm(row.id)}
              />,
              <GridActionsCellItem
                key="delete-item"
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() =>
                  confirmDelete(async () => await mutateAsync(row.id))
                }
              />,
            ],
          },
        ]}
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        getRowClassName={(params) => {
          return !params.row.isConfirmed ? "row-red" : "";
        }}
        sx={{
          "& .row-red": {
            backgroundColor: "#ffcdd2",
            color: "#b71c1c",
            "&:hover": {
              backgroundColor: "#ef9a9a",
            },
          },
        }}
      />
    </PageContainer>
  );
}
