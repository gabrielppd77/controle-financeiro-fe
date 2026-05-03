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

  function goToLancamentosForm(financialEntryId?: string) {
    if (!financialEntryId) return navigate("/lancamentos/novo");
    navigate(`/lancamentos/${financialEntryId}`);
  }

  function goToLancamentos() {
    navigate("/lancamentos");
  }

  function goToPainel() {
    navigate("/painel");
  }

  function goToRegistrar() {
    navigate("/registrar");
  }

  function goToLogin() {
    navigate("/");
  }

  return {
    goToTiposForm,
    goToTipos,
    goToLancamentosForm,
    goToLancamentos,
    goToPainel,
    goToRegistrar,
    goToLogin,
  };
}
