import { Route, Routes } from "react-router";

import VotePage from "./vote";
import ResultsPage from "./results";
import AdminPage from "./admin";
import MainPage from "./main";

import { IRoutes } from "./types";
import { ADMIN_PATH, HOME_PATH, RESULTS_PATH, VOTE_PATH } from "./constants";

const routes: IRoutes[] = [
  {
    path: HOME_PATH,
    element: <MainPage />,
  },
  {
    path: VOTE_PATH,
    element: <VotePage />,
  },
  {
    path: RESULTS_PATH,
    element: <ResultsPage />,
  },
  {
    path: ADMIN_PATH,
    element: <AdminPage />,
  },
  {
    path: "*",
    element: <MainPage />,
  },
];

export const Routing = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
