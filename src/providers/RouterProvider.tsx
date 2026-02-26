import {
  createBrowserRouter,
  RouterProvider as RouterProviderLib,
} from "react-router";

import MainLayout from "../layouts/main-layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Lancamentos from "../pages/Lancamentos";
import Tipos from "@pages/Tipos";
import TiposForm from "@pages/Tipos/form";
import Classificacoes from "@pages/Classificacoes";
import ClassificacoesForm from "@pages/Classificacoes/form";

const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Dashboard,
      },
      {
        path: "/lancamentos",
        Component: Lancamentos,
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
