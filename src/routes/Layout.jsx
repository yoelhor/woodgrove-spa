import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return <>
        <header className="header">
            <div className="container">
                {/* other elements */}

                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <Link to={`token`} className="navbar-brand">Woodgrove home</Link>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarContent">
                            <div className="navbar-nav me-auto mb-2"> </div>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={`token`} className="nav-link header-button">Token</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`profile`} className="nav-link header-button">Profile</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>

        <div id="mainContent">
            <Outlet />
        </div>
    </>;
};

export default Layout;