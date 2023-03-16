import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const NoAdminRoutes = () => {
    const token = Cookies.get('token');
    if (token) {
        return <Outlet />;
    } else {
        return <Navigate to="/inici" replace />;
    }
}

export default NoAdminRoutes;
