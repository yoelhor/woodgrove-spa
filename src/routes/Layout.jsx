import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return <>
        <div id="sidebar">
            {/* other elements */}

            <nav>
                <ul>
                    <li>
                        <Link to={`token`}>Token</Link>
                    </li>
                    <li>
                        <Link to={`profile`}>Profile</Link>
                    </li>
                </ul>
            </nav>
        </div>

        <div id="detail">
            <Outlet />
        </div>
    </>;
};

export default Layout;