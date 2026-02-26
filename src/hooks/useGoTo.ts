import { useNavigate } from "react-router";

export function useGoTo() {
  const navigate = useNavigate();

  function goToTiposForm(typeId?: string) {
    if (!typeId) return navigate("/tipos/novo");
    navigate(`/tipos/${typeId}`);
  }

  function goToTipos() {
    navigate("/tipos");
  }

  function goToClassificacoesForm(classificationId?: string) {
    if (!classificationId) return navigate("/classificacoes/novo");
    navigate(`/classificacoes/${classificationId}`);
  }

  function goToClassificacoes() {
    navigate("/classificacoes");
  }

  return {
    goToTiposForm,
    goToTipos,
    goToClassificacoesForm,
    goToClassificacoes,
  };
}
