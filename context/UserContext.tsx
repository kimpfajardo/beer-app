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

export const AuthProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) => {
  const [shoppingListData, setShoppingListData] = useState<{
    [x: string]: any;
  } | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

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

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/");
    }
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
