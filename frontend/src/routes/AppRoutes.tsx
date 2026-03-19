import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { jsonGet } from "../api/client";

import MainLayout from "../layouts/MainLayout";
import { componentMapper } from "./mapper/ComponentsMapper";
import { type NavItem, type NavResponse } from "../modules/routes/types/routes";

function AppRoutes() {
  const [routes, setRoutes] = useState<NavItem[]>([]);

  useEffect(() => {
    jsonGet<NavResponse>('/routes')
      .then(data => setRoutes(data.navigation))
      .catch(err => console.error("Error: ", err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout routes={routes} />}>
          {routes.map((item) => (
            <Route
              key={item.id}
              path={`/${item.route}`}
              element={componentMapper[item.route] || componentMapper["dashboard"]}
            />
          ))}
          <Route path="/" element={componentMapper["dashboard"]} />
          <Route path="*" element={componentMapper["dashboard"]} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
