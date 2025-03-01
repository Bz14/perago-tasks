"use client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

export const useCheckAdminLoggedIn = () => {
  const admin = useSelector((state: RootState) => state.admin);
  return admin.isLogged;
};
