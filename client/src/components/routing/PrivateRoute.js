import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//  o const authContext = useContext(AuthContext);
//   const { isAuthenticated, loading } = authContext;
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         !isAuthenticated && !loading ? (
//           <Navigate to="/login" />
//         ) : (
//           <Component {...props} />
//         )
//       }
//     />
//   );
// };

const PrivateRoute = ({ Component }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  return !isAuthenticated ? <Navigate to="/login" /> : <Component />;
  // return (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       !isAuthenticated && !loading ? (
  //         <Navigate to="/login" />
  //       ) : (
  //         <Component {...props} />
  //       )
  //     }
  //   />
  // );
};

export default PrivateRoute;
