import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthStackProvider";
import auth from "@react-native-firebase/auth";

export type Fields =
  | "phoneNumber"
  | "uniqueCode"
  | "confirmationCode"
  | "error"
  | "confirmationResult"
  | "isLoading"
  | "countryCode"
  | "isLocaleModalOpen";

type State = {
  updateField: (field: Fields, value: any) => void;
  isLocaleModalOpen: boolean;
  isLoading: boolean;
  error?: string;
  phoneNumber?: string;
  confirmationCode?: string;
  confirmationResult?: any;
  countryCode?: string;
};

export default function useAuth() {
  return useContext(AuthContext) as State;
}

export const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((res) => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscriber();
  }, []);

  return { user, isLoading };
};
