import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../service/apiClient";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const hasNavigated = useRef(false);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      if (!phone || !otp) return null;
      const response = await apiClient.post("/users/login/", { phone, otp });
      return response.data;
    },
    enabled: !!phone && !!otp,
    retry: 1,
  });

  useEffect(() => {
    if (!isLoading && isError && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate("/LoginForm");
    }
  }, [isError, isLoading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await queryClient.invalidateQueries(["userData"]); 
  };

  return (
    <ApiContext.Provider
      value={{ userData, isLoading, isError, setPhone, setOtp, handleLogin }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  return useContext(ApiContext);
};
