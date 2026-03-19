import { type JSX } from "react";

import Dashboard from "../../modules/dashboard/Dashboard";
import Routes from "../../modules/routes/Routes";

export const componentMapper: Record<string, JSX.Element> = {
  "dashboard": <Dashboard />,
  "routes": <Routes />
};
