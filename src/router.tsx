import { Routes, Route } from "react-router-dom";

import { Home } from "@pages/Home";

import { RootLayout } from "@components/RootLayout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
