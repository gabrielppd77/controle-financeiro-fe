import { useParams } from "react-router";

import PageContainer from "@components/PageContainer";
import TextField from "@components/TextField";
import { Box, Button, LinearProgress, Stack } from "@mui/material";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useClassificationsCreate from "./data/useClassificationsCreate";
import useClassificationsUpdate from "./data/useClassificationsUpdate";
import useClassificationsGet from "./data/useClassificationsGet";
import { useGoTo } from "@hooks/useGoTo";

const schema = z.object({
  id: z.string().optional(),
  name: z
    .string({ message: "Informe o Nome" })
    .min(1, "Informe pelo menos um caractere"),
});

type DataType = z.infer<typeof schema>;

export default function ClassificacoesForm() {
  const { typeId } = useParams();

  const isEdit = !!typeId;

  const pageTitle = isEdit ? "Editar" : "Adicionar";

  const {
    data,
    isLoading: _isLoading,
    isFetching,
  } = useClassificationsGet(typeId);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useClassificationsCreate();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useClassificationsUpdate();
  const { goToClassificacoes } = useGoTo();

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
    goToClassificacoes();
  }

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[
        { title: "Classificações", path: "/classificacoes" },
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
          <TextField required label="Nome" name="name" autoFocus />
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
