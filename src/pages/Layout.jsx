import { Outlet } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar.jsx";

const Layout = (props) => {
    return <>
        <header className="header">
            <div className="container">
                <NavigationBar />
            </div>
        </header>

        <div id="mainContent" className="container">
            <Outlet />
        </div>
    </>;
};

export default Layout;