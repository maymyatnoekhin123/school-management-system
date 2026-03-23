import { Navigate,Outlet } from "react-router-dom";
import { useApp } from "./ThemeApp";


export const RoleGuard = ({allowedRoles}) => {

     const {auth,authLoading} = useApp();

     const hasRole = auth?.roles?.some(role => allowedRoles.includes(role));

     if(!auth && !authLoading) return <Navigate to="/login" replace />;
     if(!hasRole && !authLoading) return <Navigate to="/" replace />;
     
     return <Outlet/>;
}