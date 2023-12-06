import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/authentication-guard";
import { Route, Routes } from "react-router-dom";
import { AdminPage } from "./pages/admin-page";
import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfilePage } from "./pages/profile-page";
import { ProtectedPage } from "./pages/protected-page";
import { PublicPage } from "./pages/public-page";
import { SqlPage } from "./pages/dashboard/sql-page";
import { JobsPage } from "./pages/dashboard/jobs-page";
import { AccountPage } from "./pages/dashboard/account-page";
import { BillingPage } from "./pages/dashboard/billing-page";

export const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/public" element={<PublicPage />} />
      <Route
        path="/profile"
        element={<AuthenticationGuard component={ProfilePage} />}
      />
      <Route
        path="/protected"
        element={<AuthenticationGuard component={ProtectedPage} />}
      />
      <Route
        path="/admin"
        element={<AuthenticationGuard component={AdminPage} />}
      />
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
