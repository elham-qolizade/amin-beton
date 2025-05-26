/*eslint-disable */
import { useQuery } from "@tanstack/react-query";
// import { getCurrentUser } from "../../services/apiAuth";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { useState } from "react";

export function useUser() {
  // const { isLoading, data } = useQuery({
  //   queryKey: ["token"],
  //   queryFn: () => getCurrentUser(),
  // });

  // const [token, setToken] = useLocalStorageState("", "token");
  const [isLoading, setIsLoading] = useState(false);

  setIsLoading(true);
  const token = localStorage.getItem("token");
  let isAuthenticated;
  if (token) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  console.log("isAuthenticated : ", isAuthenticated);

  setIsLoading(false);
  return { isLoading, isAuthenticated };
}
