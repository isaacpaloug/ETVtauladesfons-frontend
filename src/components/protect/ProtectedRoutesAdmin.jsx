import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutesAdmin = () => {
    const isAdmin = Cookies.get('isAdmin');
    if (isAdmin) {
        return <Outlet />;
    } else {
        return <Navigate to="/inici" replace />;
    }
}

export default ProtectedRoutesAdmin;
