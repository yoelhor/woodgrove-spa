import { Link } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

import { loginRequest } from '../authConfig';

export const NavigationBar = () => {
    const { instance } = useMsal();

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    const handleLoginRedirect = () => {
        instance.loginRedirect(loginRequest)
            .catch((error) => console.log(error));
    };

    const handleLoginPopup = () => {
        /**
         * When using popup and silent APIs, we recommend setting the redirectUri to a blank page or a page 
         * that does not implement MSAL. Keep in mind that all redirect routes must be registered with the application
         * For more information, please follow this link: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md#redirecturi-considerations 
         */

        instance.loginPopup({
            ...loginRequest,
            redirectUri: '/redirect.html'
        }).catch((error) => console.log(error));
    };

    const handleLogoutRedirect = () => {
        instance.logoutRedirect({
            account: instance.getActiveAccount(),
        });
    };

    const handleLogoutPopup = () => {
        instance.logoutPopup({
            mainWindowRedirectUri: '/', // redirects the top level app after logout
            account: instance.getActiveAccount(),
        });
    };

    /**
     * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
     * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
     * only render their children if a user is authenticated or unauthenticated, respectively.
     */
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to={`/`} className="navbar-brand">Woodgrove home</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <div className="navbar-nav me-auto mb-2"> </div>
                        <ul className="navbar-nav">

                            {/* UI elements for unauthenticated users */}
                            <UnauthenticatedTemplate>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Sign in
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><button className="dropdown-item" onClick={handleLoginPopup}> Sign in using Popup</button></li>
                                        <li><button className="dropdown-item" onClick={handleLoginRedirect}>Sign in using Redirect</button></li>
                                    </ul>
                                </li>
                            </UnauthenticatedTemplate>

                            {/* UI elements for authenticated users */}
                            <AuthenticatedTemplate>
                                <li className="nav-item">
                                    <Link to={`token`} className="nav-link">Hello {activeAccount ? activeAccount.name : 'Unknown'}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`profile`} className="nav-link">Profile</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Sign out
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><button className="dropdown-item" onClick={handleLogoutPopup}>Sign out using Popup</button></li>
                                        <li><button className="dropdown-item" onClick={handleLogoutRedirect}>Sign out using Redirect</button></li>
                                    </ul>
                                </li>
                            </AuthenticatedTemplate>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};
