import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import AdminLayout from "layouts/Admin.js";
import ClientLayout from "layouts/Client";
import CaregiverLayout from "layouts/Caregiver";
import Homepage from "demos/Homepage.js";
import LoginPage from "./views/auth/Login";

function RouterComp() {
  const { loggedIn, userDetail } = useAuth();

  // Helper function to render role-specific route
  const renderRoleRoute = (role, Layout, defaultPath) => {
    if (userDetail.role === role) {
      return (
        <>
          <Route path={`/${role}`} render={(props) => <Layout {...props} />} />
          <Redirect to={defaultPath} />
        </>
      );
    }
    return null;
  };

  return (
    <BrowserRouter>
      <Switch>
        {/* Public routes */}
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={LoginPage} />

        {/* Protected routes */}
        {loggedIn ? (
          <>
            {renderRoleRoute("admin", AdminLayout, "/admin/dashboard")}
            {renderRoleRoute("client", ClientLayout, "/client/dashboard")}
            {renderRoleRoute(
              "caregiver",
              CaregiverLayout,
              "/caregiver/dashboard",
            )}
          </>
        ) : (
          // If not logged in, redirect to homepage
          <Redirect to="/" />
        )}

        {/* Fallback route */}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default RouterComp;
