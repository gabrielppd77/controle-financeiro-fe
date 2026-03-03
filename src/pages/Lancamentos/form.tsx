import { useParams } from "react-router";

import PageContainer from "@components/PageContainer";
import TextField from "@components/TextField";
import DatePicker from "@components/DatePicker";

import { Box, Button, LinearProgress, Stack } from "@mui/material";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useFinancialEntriesCreate from "./data/useFinancialEntriesCreate";
import useFinancialEntriesUpdate from "./data/useFinancialEntriesUpdate";
import useFinancialEntriesGet from "./data/useFinancialEntriesGet";
import { useGoTo } from "@hooks/useGoTo";

const schema = z.object({
  id: z.guid().optional(),
  date: z.string({ message: "Informe uma Data" }),
  amount: z
    .number({ message: "Informe um Valor" })
    .min(0.01, "Informe pelo menos 0.01"),
  typeId: z.guid({ message: "Informe um Tipo" }),
  classificationId: z.guid({ message: "Informe uma Classificação" }),
  description: z.string().optional().nullable(),
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

  const form = useForm<DataType>({
    resolver: zodResolver(schema),
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
    goToLancamentos();
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
          <LinearProgress
            sx={{
              display: isLoading ? "block" : "none",
            }}
          />
          <DatePicker label="Data" name="date" required />
          {/* date <br />
          https://mui.com/x/react-date-pickers/date-picker/ amount <br />{" "}
          https://github.com/gabrielppd77/main-menu-admin/blob/main/src/components/CurrencyTextField/index.tsx
          typeId <br />
          https://github.com/gabrielppd77/main-menu-admin/blob/main/src/components/AutoComplete/index.tsx
          &&&
          https://github.com/gabrielppd77/main-menu-admin/blob/main/src/components/AutoCompleteCategory/index.tsx
          <br />
          classificationId */}
          <TextField label="Descrição" name="description" />
          <Box
            sx={{
              justifyContent: "end",
              display: "flex",
            }}
          >
            <Button
              loading={isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
            >
              Salvar
            </Button>
          </Box>
        </Stack>
      </FormProvider>
    </PageContainer>
  );
}
