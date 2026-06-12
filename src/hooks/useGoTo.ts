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

  function goToContasForm(accountId?: string) {
    if (!accountId) return navigate("/contas/novo");
    navigate(`/contas/${accountId}`);
  }

  function goToContas() {
    navigate("/contas");
  }

  function goToLancamentosForm(financialEntryId?: string) {
    if (!financialEntryId) return navigate("/lancamentos/novo");
    navigate(`/lancamentos/${financialEntryId}`);
  }

  function goToLancamentos() {
    navigate("/lancamentos");
  }

  function goToRecurringEntriesForm(recurringEntryId?: string) {
    if (!recurringEntryId) return navigate("/lancamentos-recorrentes/novo");
    navigate(`/lancamentos-recorrentes/${recurringEntryId}`);
  }

  function goToRecurringEntries() {
    navigate("/lancamentos-recorrentes");
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
    goToContasForm,
    goToContas,
    goToLancamentosForm,
    goToLancamentos,
    goToRecurringEntriesForm,
    goToRecurringEntries,
    goToPainel,
    goToRegistrar,
    goToLogin,
  };
}
