import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";

import PageContainer from "../../components/PageContainer";
import DataTable from "../../components/DataTable";

import { useFinancialEntriesList } from "./data/useFinancialEntriesList";
import { formatDate, formatMoney } from "@utils";

export default function Lancamentos() {
  const pageTitle = "Lançamentos";

  const { data, isLoading, isFetching } = useFinancialEntriesList();

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[{ title: pageTitle }]}
      actions={
        <Stack>
          <Button variant="contained" startIcon={<AddIcon />} color="success">
            Criar
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
            getActions: () => [
              <GridActionsCellItem
                key="edit-item"
                icon={<EditIcon />}
                label="Edit"
              />,
              <GridActionsCellItem
                key="delete-item"
                icon={<DeleteIcon />}
                label="Delete"
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
