/*eslint-disable */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Spinner from "./Spinner";

import { useUser } from "../features/auth/useUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1) load the cred
  const { isLoadingUser, user } = useUser();

  //  3) if there is no authenticated user , redirect to /login
  useEffect(
    function () {
      if (!user && !isLoadingUser) return navigate("/login");
    },
    [isLoadingUser, user, navigate]
  );

  //  2) while loading show the Spinner
  if (isLoadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4)if there is an authenticated user, render the app
  if (user) return children;
}

export default ProtectedRoute;

// const [isLoading, setIsLoading] = useState(false);
// const [isAuthenticated, setIsAuthenticated] = useState(2);
// const token = JSON.parse(localStorage.getItem("token"));

// useEffect(() => {
//   // Check if the user is authenticated (e.g., by checking if the access token exists)
//   setIsLoading(true);

//   if (token) {
//     // console.log("token:", Boolean(token));
//     setIsAuthenticated(true);
//   } else {
//     // console.log("token:", Boolean(token));
//     setIsAuthenticated(false);
//   }
//   setIsLoading(false);
// }, [token]);

// console.log("protected route isAuthenticated: ", isAuthenticated);

// useEffect(
//   function () {
//     if (!isAuthenticated && !isLoading) return navigate("/login");
//   },
//   [isAuthenticated, isLoading, navigate]
// );
