import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";

import PageContainer from "../../components/PageContainer";
import DataTable from "../../components/DataTable";

import useFinancialEntriesList from "./data/useFinancialEntriesList";
import useFinancialEntriesDelete from "./data/useFinancialEntriesDelete";
import { useGoTo } from "@hooks/useGoTo";
import { confirmDelete } from "@libs/alert";
import { formatDate, formatMoney } from "@utils";

export default function Lancamentos() {
  const pageTitle = "Lançamentos";

  const { data, isLoading, isFetching } = useFinancialEntriesList();
  const { mutateAsync } = useFinancialEntriesDelete();

  const { goToLancamentosForm } = useGoTo();

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[{ title: pageTitle }]}
      actions={
        <Stack>
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
      <DataTable
        columns={[
          {
            field: "date",
            headerName: "Data",
            valueFormatter: formatDate,
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
          },
          {
            field: "classificationName",
            headerName: "Classificação",
            minWidth: 110,
          },
          {
            field: "description",
            headerName: "Descrição",
            flex: 1,
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
      />
    </PageContainer>
  );
}
