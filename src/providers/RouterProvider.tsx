import {
  createBrowserRouter,
  RouterProvider as RouterProviderLib,
} from "react-router";

import MainLayout from "@layouts/main-layout";
import PublicLayout from "@layouts/public-layout";

import Dashboard from "@pages/Dashboard";
import Lancamentos from "@pages/Lancamentos";
import LancamentosForm from "@pages/Lancamentos/form";
import Tipos from "@pages/Tipos";
import TiposForm from "@pages/Tipos/form";
import Classificacoes from "@pages/Classificacoes";
import ClassificacoesForm from "@pages/Classificacoes/form";
import Login from "@pages/Login";
import Register from "@pages/Register";

const router = createBrowserRouter([
  {
    Component: PublicLayout,
    children: [
      {
        path: "/",
        Component: Login,
      },
      {
        path: "/registrar",
        Component: Register,
      },
    ],
  },
  {
    Component: MainLayout,
    children: [
      {
        path: "/painel",
        Component: Dashboard,
      },
      {
        path: "/lancamentos",
        Component: Lancamentos,
      },
      {
        path: "/lancamentos/novo",
        Component: LancamentosForm,
      },
      {
        path: "/lancamentos/:typeId",
        Component: LancamentosForm,
      },
      {
        path: "/tipos",
        Component: Tipos,
      },
      {
        path: "/tipos/novo",
        Component: TiposForm,
      },
      {
        path: "/tipos/:typeId",
        Component: TiposForm,
      },
      {
        path: "/classificacoes",
        Component: Classificacoes,
      },
      {
        path: "/classificacoes/novo",
        Component: ClassificacoesForm,
      },
      {
        path: "/classificacoes/:typeId",
        Component: ClassificacoesForm,
      },
      {
        path: "*",
        Component: () => <>Página em construção - Página não encontrada</>,
      },
    ],
  },
]);

export default function RouterProvider() {
  return <RouterProviderLib router={router} />;
}
