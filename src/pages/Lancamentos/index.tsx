import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";

import PageContainer from "../../components/PageContainer";
import DataTable from "../../components/DataTable";

import useFinancialEntriesList from "./data/useFinancialEntriesList";
import useFinancialEntriesDelete from "./data/useFinancialEntriesDelete";
import { useGoTo } from "@hooks/useGoTo";
import { confirmDelete } from "@libs/alert";
import {
  changeFormatter,
  formatDate,
  formatMoney,
  valueFormatter,
} from "@utils";

import { useSearchParams } from "react-router";

import CurrencyTextField from "@components/CurrencyTextField";
import AutoCompleteTipo from "@components/AutoComplete/AutoCompleteTipo";
import AutoCompleteClassificacao from "@components/AutoComplete/AutoCompleteClassificacao";
import DatePickerDebounce from "@components/DatePickerDebounce";
import BoxColor from "@components/BoxColor";
import TextFieldDebounce from "@components/TextFieldDebounce";
import UploadCsvButton from "@components/UploadCsvButton";
import { ClassificationEnum } from "./data/dtos/ClassificationEnum";

const DataTableMemoized = React.memo(DataTable);

import z from "zod";

const filterSchema = z.object({
  initialDate: z.string().nullable(),
  finalDate: z.string().nullable(),
  initialAmount: z.coerce.number().nullable(),
  finalAmount: z.coerce.number().nullable(),
  searchText: z.string().nullable(),
  typeId: z.string().nullable(),
  classification: z.enum(ClassificationEnum).nullable(),
  isNotConfirmed: z
    .string()
    .nullable()
    .transform((val) => {
      if (val === null) return null;
      return val === "true";
    }),
});

type DataType = z.infer<typeof filterSchema>;

export default function Lancamentos() {
  const pageTitle = "Lançamentos";

  const [searchParams, setSearchParams] = useSearchParams();

  const filters = filterSchema.parse({
    initialDate: searchParams.get("initialDate"),
    finalDate: searchParams.get("finalDate"),
    initialAmount: searchParams.get("initialAmount"),
    finalAmount: searchParams.get("finalAmount"),
    searchText: searchParams.get("searchText"),
    typeId: searchParams.get("typeId"),
    classification: searchParams.get("classification"),
    isNotConfirmed: searchParams.get("isNotConfirmed"),
  });

  function updateFilters(newFilters: DataType) {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value == null) return;
      params.set(key, String(value));
    });

    setSearchParams(params);
  }

  const { isNotConfirmed, ...restOfFilters } = filters;

  const { data, isLoading, isFetching, refetch } = useFinancialEntriesList({
    data: {
      ...restOfFilters,
      isConfirmed: isNotConfirmed === null ? null : !isNotConfirmed,
    },
  });

  const { mutateAsync } = useFinancialEntriesDelete();

  const { goToLancamentosForm } = useGoTo();

  const valueTotal = (data || []).reduce((pv, ct) => {
    return pv + ct.amount;
  }, 0);

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
      <Grid container spacing={1} sx={{ mb: 1 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DatePickerDebounce
            label="Data inicial"
            name="initialDate"
            onChange={(newValue) => {
              updateFilters({
                ...filters,
                initialDate: changeFormatter(
                  newValue?.isValid() ? newValue : null,
                ),
              });
            }}
            value={valueFormatter(filters.initialDate)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DatePickerDebounce
            label="Data final"
            name="finalDate"
            onChange={(newValue) => {
              updateFilters({
                ...filters,
                finalDate: changeFormatter(newValue || null),
              });
            }}
            value={valueFormatter(filters.finalDate)}
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
            name="classification"
            onChange={(d) =>
              updateFilters({
                ...filters,
                classification: (d as ClassificationEnum) || null,
              })
            }
            value={filters.classification || undefined}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 8, lg: 10 }}>
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
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          size={{ xs: 12, sm: 4, lg: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={filters.isNotConfirmed === true}
                indeterminate={filters.isNotConfirmed === null}
                onChange={() => {
                  let nextValue: boolean | null;

                  if (filters.isNotConfirmed === null) nextValue = true;
                  else if (filters.isNotConfirmed === true) nextValue = false;
                  else nextValue = null;

                  updateFilters({
                    ...filters,
                    isNotConfirmed: nextValue,
                  });
                }}
              />
            }
            label="Não confirmados"
          />
        </Grid>
        <Grid sx={{}} size={{ xs: 6 }}>
          <Typography>Valor total: {formatMoney(valueTotal)}</Typography>
        </Grid>
        <Grid
          size={{ xs: 6 }}
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button onClick={() => refetch()}>Buscar</Button>
        </Grid>
      </Grid>

      <DataTableMemoized
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
              <Box display="flex" alignItems="center" height="100%" gap={1}>
                {row.classificationName}
                <BoxColor color={row.classificationColor} fine />
              </Box>
            ),
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
