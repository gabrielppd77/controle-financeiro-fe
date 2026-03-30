import AutoComplete from "./AutoComplete";
import useClassificationsList from "@pages/Classificacoes/data/useClassificationsList";

interface AutoCompleteClassificacaoProps {
  name: string;
  required?: boolean;
  onChange?: (d: string) => void;
  value?: string;
}

export default function AutoCompleteClassificacao({
  name,
  required,
  onChange,
  value,
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
      required={required}
      onChange={onChange}
      value={value}
    />
  );
}
