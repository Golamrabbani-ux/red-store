import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Route, useLocation } from "react-router";

function PrivateRoute({ children, ...rest }) {
    const location = useLocation()
    const { userInfo } = useSelector(state => state?.userLogin);
    return (
        <Route
            {...rest}
            render={({ a }) =>
                userInfo.email ? (
                    children
                ) : (
                    <Link
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;