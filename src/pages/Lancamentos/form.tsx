import { useParams } from "react-router";

import PageContainer from "@components/PageContainer";
import TextField from "@components/TextField";
import DatePicker from "@components/DatePicker";
import AutoCompleteTipo from "@components/AutoComplete/AutoCompleteTipo";
import AutoCompleteClassificacao from "@components/AutoComplete/AutoCompleteClassificacao";

import { Button, Grid, Stack } from "@mui/material";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useStorageValues from "@hooks/useStorageValues";
import { useGoTo } from "@hooks/useGoTo";

import useFinancialEntriesCreate from "./data/useFinancialEntriesCreate";
import useFinancialEntriesUpdate from "./data/useFinancialEntriesUpdate";
import useFinancialEntriesGet from "./data/useFinancialEntriesGet";
import CurrencyTextField from "@components/CurrencyTextField";
import { todayDate } from "@utils";
import FetchingLoading from "@components/FetchingLoading";
import FormProvider from "@components/FormProvider";

const schema = z.object({
  id: z.guid().optional(),
  date: z.string({ message: "Informe uma Data" }),
  amount: z
    .number({ message: "Informe um Valor" })
    .min(0.01, "Informe pelo menos 0.01"),
  typeId: z.guid({ message: "Informe um Tipo" }),
  classificationId: z.guid({ message: "Informe uma Classificação" }),
  description: z.string().nullable(),
});

type DataType = z.infer<typeof schema>;

export default function LancamentosForm() {
  const { typeId } = useParams();

  const isEdit = !!typeId;

  const pageTitle = isEdit ? "Editar" : "Adicionar";

  const {
    data,
    isLoading: _isLoading,
    isFetching,
  } = useFinancialEntriesGet(typeId);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useFinancialEntriesCreate();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useFinancialEntriesUpdate();
  const { goToLancamentos } = useGoTo();

  const isLoading = _isLoading || isFetching;
  const isSubmitting = isPendingCreate || isPendingUpdate;

  const favDateKey = "fav_date";
  const favClassificationIdKey = "fav_classificationId";
  const favTypeIdKey = "fav_typeId";

  const storageValues = useStorageValues();

  const getLastFavValues = () => {
    return {
      date: storageValues.get(favDateKey) || todayDate(),
      classificationId: storageValues.get(favClassificationIdKey) || "",
      typeId: storageValues.get(favTypeIdKey) || "",
    };
  };

  const form = useForm<DataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...getLastFavValues(),
      amount: 0,
      description: null,
    },
    values: data,
  });

  async function onSubmit(d: DataType) {
    if (d.id) {
      await mutateAsyncUpdate({
        data: { ...d, id: d.id },
      });
    } else {
      await mutateAsyncCreate({
        data: d,
      });
    }

    storageValues.set(favDateKey, d.date);
    storageValues.set(favTypeIdKey, d.typeId);
    storageValues.set(favClassificationIdKey, d.classificationId);

    form.reset({ ...getLastFavValues() });
  }

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[
        { title: "Lançamentos", path: "/lancamentos" },
        { title: pageTitle },
      ]}
    >
      <FormProvider {...form}>
        <Stack gap={1}>
          <Grid container spacing={1}>
            <FetchingLoading loading={isLoading} />
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker label="Data" name="date" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CurrencyTextField
                label="Valor"
                name="amount"
                required
                autoFocus
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AutoCompleteTipo name="typeId" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AutoCompleteClassificacao name="classificationId" required />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Descrição"
                name="description"
                rows={4}
                multiline
              />
            </Grid>
          </Grid>
          <Stack direction="row" gap={1} justifyContent="end">
            <Button onClick={goToLancamentos} variant="outlined">
              Cancelar
            </Button>
            <Button
              loading={isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
              type="submit"
            >
              Salvar
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </PageContainer>
  );
}
