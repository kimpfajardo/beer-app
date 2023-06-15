"use client";
import { fetchShoppingList } from "@/utils/functions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const supabase = createClientComponentClient();

  const getUser = useCallback(async () => {
    const { data, error } = await supabase.auth.getUser();
    const { user: userData } = data;
    if (error) {
      return;
    }
    setUser(userData);
  }, [supabase]);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const { session } = data;
        return session;
      } catch (error) {
        console.log(error);
      }
    };

    const session = getSession();
    session.then((sessionData) => {
      if (sessionData) {
        getUser();
      }
    });
  }, [supabase, getUser]);

  useEffect(() => {
    if (user) {
      const handleShoppingList = async () => {
        const { data, error } = await fetchShoppingList(
          user?.id as string,
          supabase
        );

        if (error) {
          handleShoppingList();
          return;
        }
        setShoppingListData(data?.[0] ?? null);
      };
      handleShoppingList();
    }
  }, [user, supabase]);

  const signOut = () => {
    supabase.auth.signOut();
    getUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
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
