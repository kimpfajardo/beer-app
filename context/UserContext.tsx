"use client";
import { createShoppingList, fetchShoppingList } from "@/utils/functions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { set } from "zod";

export interface UserType extends User {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  birthdate: string;
}

export interface AuthContextType {
  user: User | null;
  signOut: () => void;
  getSession: () => Promise<any>;
  shoppingListData: {
    [x: string]: any;
  } | null;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [shoppingListData, setShoppingListData] = useState<{
    [x: string]: any;
  } | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const getUser = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      const { user: userData } = data;
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const getSession = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const { session } = data;
      return session;
    } catch (error) {
      console.log(error);
    }
  };

  const handleShoppingList = async () => {
    const { data, error: shoppingListError } = await fetchShoppingList(
      user?.id as string,
      supabase
    );
    const hasNoShoppingList = !shoppingListError && data?.length === 0;
    if (hasNoShoppingList) {
      return await createShoppingList(
        user?.id as string,
        supabase,
        handleShoppingList
      );
    }
    if ((data ?? [])?.length > 0) {
      setShoppingListData(data?.[0] ?? null);
      return;
    }
  };

  useEffect(() => {
    const session = getSession();
    session.then((sessionData) => {
      if (sessionData) {
        getUser();
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      handleShoppingList();
    }
  }, [user]);

  const signOut = () => {
    supabase.auth.signOut();
    getUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
        getSession,
        shoppingListData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
