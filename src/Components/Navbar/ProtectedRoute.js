import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ user, element: Component, ...props }) {
    return (
        <Route
            {...props}
            element={user ? <Component /> : <Navigate to="/login" />}
        />
    );
}

export default ProtectedRoute;
