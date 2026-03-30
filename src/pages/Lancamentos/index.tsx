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
import { endOfMonth, formatDate, formatMoney, startOfMonth } from "@utils";

import { useSearchParams } from "react-router";

import type { FinancialEntryFilterDto } from "./data/dtos/FinancialEntryFilterDto";
import CurrencyTextField from "@components/CurrencyTextField";
import AutoCompleteTipo from "@components/AutoComplete/AutoCompleteTipo";
import AutoCompleteClassificacao from "@components/AutoComplete/AutoCompleteClassificacao";
import TextFieldDebounce from "@components/TextFieldDebounce";
import DatePicker from "@components/DatePicker";
import dayjs from "dayjs";
import { Grid } from "@mui/material";

export default function Lancamentos() {
  const pageTitle = "Lançamentos";

  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FinancialEntryFilterDto = {
    initialDate:
      searchParams.get("initialDate") === null
        ? startOfMonth()
        : searchParams.get("initialDate"),
    finalDate:
      searchParams.get("finalDate") === null
        ? endOfMonth()
        : searchParams.get("finalDate"),
    initialAmount: searchParams.get("initialAmount")
      ? Number(searchParams.get("initialAmount"))
      : null,
    finalAmount: searchParams.get("finalAmount")
      ? Number(searchParams.get("finalAmount"))
      : null,
    searchText: searchParams.get("searchText"),
    typeId: searchParams.get("typeId"),
    classificationId: searchParams.get("classificationId"),
  };

  const { data, isLoading, isFetching } = useFinancialEntriesList({
    data: filters,
  });
  const { mutateAsync } = useFinancialEntriesDelete();

  const { goToLancamentosForm } = useGoTo();

  function updateFilters(newFilters: FinancialEntryFilterDto) {
    const params = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    setSearchParams(params);
  }

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
      <Grid container spacing={1} sx={{ mb: 1 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DatePicker
            label="Data inicial"
            name="initialDate"
            onChange={(newValue) => {
              updateFilters({
                ...filters,
                initialDate: newValue ? newValue.toISOString() : null,
              });
            }}
            value={filters.initialDate ? dayjs(filters.initialDate) : null}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DatePicker
            label="Data final"
            name="finalDate"
            onChange={(newValue) => {
              updateFilters({
                ...filters,
                finalDate: newValue ? newValue.toISOString() : null,
              });
            }}
            value={filters.finalDate ? dayjs(filters.finalDate) : null}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CurrencyTextField
            label="Valor inicial"
            name="initialAmount"
            onValueChange={({ floatValue }) =>
              updateFilters({ ...filters, initialAmount: floatValue || null })
            }
            value={filters.initialAmount}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CurrencyTextField
            label="Valor final"
            name="finalAmount"
            onValueChange={({ floatValue }) =>
              updateFilters({ ...filters, finalAmount: floatValue || null })
            }
            value={filters.finalAmount}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <AutoCompleteTipo
            name="typeId"
            onChange={(d) => updateFilters({ ...filters, typeId: d || null })}
            value={filters.typeId || undefined}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <AutoCompleteClassificacao
            name="classificationId"
            onChange={(d) =>
              updateFilters({ ...filters, classificationId: d || null })
            }
            value={filters.classificationId || undefined}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextFieldDebounce
            label="Buscar"
            name="searchText"
            onChange={(d) =>
              updateFilters({ ...filters, searchText: d || null })
            }
            value={filters.searchText || undefined}
            fullWidth
          />
        </Grid>
      </Grid>

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
