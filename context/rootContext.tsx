"use client";
import { getCookie } from "@/lib/cookie";
import { decryptData } from "@/lib/cryptoUtils";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type RootContextType = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  userData: any;
  // Add more states as needed
};

const RootContext = createContext<RootContextType | undefined>(undefined);

export const RootProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      let decodedUserInfo = JSON.parse(decryptData(userInfo));
      setUserData(decodedUserInfo);
    }
  }, []);

  return (
    <RootContext.Provider
      value={{ isLoading, setLoading: setIsLoading, error, setError, userData }}
    >
      {children}
    </RootContext.Provider>
  );
};

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error("useRootContext must be used within a RootProvider");
  }
  return context;
};
