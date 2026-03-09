// Auth context using localStorage (Supabase-ready)
import { createContext, useContext } from "react";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  gender: "male" | "female";
  goal: "lose" | "build" | "fit";
  days: string;
  plan: "1m" | "2m" | "3m" | "12m";
  planStart: string;
  planEnd: string;
};

export const saveUser = (user: AuthUser) => {
  localStorage.setItem("trainx7_user", JSON.stringify(user));
};

export const getUser = (): AuthUser | null => {
  try {
    const d = localStorage.getItem("trainx7_user");
    return d ? JSON.parse(d) : null;
  } catch { return null; }
};

export const clearUser = () => localStorage.removeItem("trainx7_user");

export const isLoggedIn = (): boolean => !!getUser();

export const getPlanLabel = (plan: string) =>
  ({ "1m": "Basic", "2m": "Standard", "3m": "Advanced", "12m": "Elite" }[plan] || "Basic");

export const getPlanPrice = (plan: string) =>
  ({ "1m": "$49", "2m": "$89", "3m": "$119", "12m": "$399" }[plan] || "$49");

export const getPlanMonths = (plan: string): number =>
  ({ "1m": 1, "2m": 2, "3m": 3, "12m": 12 }[plan] || 1);

export const addMonths = (date: Date, months: number): Date => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};
