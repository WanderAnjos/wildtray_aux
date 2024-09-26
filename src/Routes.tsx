import { createMemoryRouter } from "react-router-dom";
import { ConfigPage } from "./pages/config-page";
import { DataBasePage } from "./pages/database-page";
import { InitialPage } from "./pages/initial-page";
import { MainPage } from "./pages/main-page";
import { ModulesPage } from "./pages/modules.page";
import { NotFoundPage } from "./pages/not-found-page";

export const router = createMemoryRouter(
  [
    {
      path: '/',
      element: <InitialPage />,
      errorElement: <NotFoundPage />
    },
    {
      path: '/main',
      element: <MainPage />
    },
    {
      path: '/database',
      element: <DataBasePage />
    },
    {
      path: '/modules',
      element: <ModulesPage />
    },
    {
      path: '/config',
      element: <ConfigPage />
    }
  ],
  {
    initialEntries: ['/'],
  },
)