/*eslint-disable */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useUser } from "../features/auth/useUser";

import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1) load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //  3) if there is no authenticated user , redirect to /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) return navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //  2) while loading show the Spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //   4)if there is an authenticated user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
