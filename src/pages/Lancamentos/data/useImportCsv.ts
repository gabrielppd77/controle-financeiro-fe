import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@libs/api";
import { fireError } from "@libs/alert";
import type { ImportationCSVResponse } from "./dtos/ImportationCSVResponse";
import { notifySuccess } from "@libs/notification";
import { queryFinancialEntriesList } from "./useFinancialEntriesList";
import type { ImportationCSVRequest } from "./dtos/ImportationCSVRequest";

interface RequestProps {
  data: ImportationCSVRequest;
}

export default function useImportCsv() {
  const queryClient = useQueryClient();

  async function handleRequest({ data }: RequestProps) {
    const { file, dateFinancialEntry, accountId } = data;

    const formData = new FormData();

    formData.append("file", file);

    return await api.post<ImportationCSVResponse>(
      "/Importations/Csv",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          dateFinancialEntry,
          accountId,
        },
      },
    );
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: (d) => {
      notifySuccess(
        `Importação realizada com sucesso! Template ${d.data.detectedTemplate} Quantidade de importados ${d.data.importedCount}`,
      );
      queryClient.invalidateQueries({
        queryKey: queryFinancialEntriesList,
      });
    },
    onError: fireError,
  });
}
