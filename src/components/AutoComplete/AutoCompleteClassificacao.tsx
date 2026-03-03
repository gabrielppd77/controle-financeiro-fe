import AutoComplete from "./AutoComplete";
import useClassificationsList from "@pages/Classificacoes/data/useClassificationsList";

interface AutoCompleteClassificacaoProps {
  name: string;
}

export default function AutoCompleteClassificacao({
  name,
}: AutoCompleteClassificacaoProps) {
  const {
    data,
    isLoading: _isLoading,
    isFetching,
    refetch,
  } = useClassificationsList({ enabled: false });
  const isLoading = _isLoading || isFetching;

  return (
    <AutoComplete
      options={data || []}
      isLoading={isLoading}
      label="Classificação"
      name={name}
      idField="id"
      renderOptions={(d) => d.name}
      onRefetch={refetch}
      required
    />
  );
}
