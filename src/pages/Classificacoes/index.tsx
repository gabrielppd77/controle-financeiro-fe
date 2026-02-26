import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";

import PageContainer from "../../components/PageContainer";
import DataTable from "../../components/DataTable";

import useClassificationsList from "./data/useClassificationsList";
import useClassificationsDelete from "./data/useClassificationsDelete";
import { useGoTo } from "@hooks/useGoTo";
import { confirmDelete } from "@libs/alert";

export default function Classificacoes() {
  const pageTitle = "Classificações";

  const { data, isLoading, isFetching } = useClassificationsList();
  const { mutateAsync } = useClassificationsDelete();

  const { goToClassificacoesForm } = useGoTo();

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[{ title: pageTitle }]}
      actions={
        <Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => goToClassificacoesForm()}
          >
            Adicionar
          </Button>
        </Stack>
      }
    >
      <DataTable
        columns={[
          {
            field: "name",
            headerName: "Nome",
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
                onClick={() => goToClassificacoesForm(row.id)}
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
