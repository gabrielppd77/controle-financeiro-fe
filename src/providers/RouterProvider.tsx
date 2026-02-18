import {
  createBrowserRouter,
  RouterProvider as RouterProviderLib,
} from "react-router";

import MainLayout from "../layouts/main-layout/MainLayout";

const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: () => <>Página em construção - Painel</>,
      },
      // {
      //   path: '/employees',
      //   Component: EmployeeList,
      // },
      // {
      //   path: '/employees/:employeeId',
      //   Component: EmployeeShow,
      // },
      // {
      //   path: '/employees/new',
      //   Component: EmployeeCreate,
      // },
      // {
      //   path: '/employees/:employeeId/edit',
      //   Component: EmployeeEdit,
      // },
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
