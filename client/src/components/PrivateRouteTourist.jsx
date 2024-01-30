import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser && currentUser.usertype === 'Tourist' ? <Outlet/> : <Navigate to='/sign-in'/>;
}
