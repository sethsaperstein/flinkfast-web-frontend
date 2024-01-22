import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { AuthenticationGuard } from "./components/authentication-guard";
import { Route, Routes } from "react-router-dom";
import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { SqlPage } from "./pages/dashboard/sql-page";
import { JobsPage } from "./pages/dashboard/jobs-page";
import { AccountPage } from "./pages/dashboard/account-page";
import { BillingPage } from "./pages/dashboard/billing-page";
import { PageLoader } from "./components/page-loader";

export const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <PageLoader />
    );
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/sql"
        element={<AuthenticationGuard component={SqlPage} />}
      />
      <Route
        path="/jobs"
        element={<AuthenticationGuard component={JobsPage} />}
      />
      <Route
        path="/account"
        element={<AuthenticationGuard component={AccountPage} />}
      />
      <Route
        path="/billing"
        element={<AuthenticationGuard component={BillingPage} />}
      />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
