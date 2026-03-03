import useFinancialTypesList from "@pages/Tipos/data/useFinancialTypesList";
import AutoComplete from "./AutoComplete";

interface AutoCompleteTipoProps {
  name: string;
}

export default function AutoCompleteTipo({ name }: AutoCompleteTipoProps) {
  const {
    data,
    isLoading: _isLoading,
    isFetching,
    refetch,
  } = useFinancialTypesList({ enabled: false });
  const isLoading = _isLoading || isFetching;

  return (
    <AutoComplete
      options={data || []}
      isLoading={isLoading}
      label="Tipo"
      name={name}
      idField="id"
      renderOptions={(d) => d.name}
      onRefetch={refetch}
      required
    />
  );
}
