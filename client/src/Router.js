import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Homepage from "demos/Homepage.js";
import { useAuth } from './contexts/AuthContext';

import AdminLayout from "layouts/Admin.js";
import ClientLayout from "layouts/Client";
import CaregiverLayout from "layouts/Caregiver";

import LoginPage from "./views/auth/Login";
//import MainLandingPage from "MainLandingPage.js";

function RouterComp() {

    const { loggedIn, userDetail } = useAuth();

    return (
        <BrowserRouter>
            {loggedIn ?
                <>
                    <Switch>
                        {userDetail.role === 'admin' ?
                            <>
                                {console.log(userDetail, "admin")}
                                <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                                <Redirect to="/admin/dashboard" />
                            </>
                            : null
                        }
                        {userDetail.role === 'client' ?
                            <>

                                <Route path="/client" render={(props) => <ClientLayout {...props} />} />
                                <Redirect to="/client/dashboard" />
                            </> : null
                        }
                        {userDetail.role === 'caregiver' ?
                            <>
                                <Route path="/caregiver" render={(props) => <CaregiverLayout {...props} />} />
                                <Redirect to="/caregiver/dashboard" />
                            </>
                            : null
                        }
                    </Switch>

                </>
                :
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/login" component={LoginPage} />
                    <Redirect to="/" />
                </Switch>

            }

        </BrowserRouter>
    )
}
export default RouterComp;


