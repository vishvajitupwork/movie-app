import apiconfig from "./apiConfig";
import { LoginFields } from "@/components/signForm";

export interface LoginResponse {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  token: string;
}

export const login = async (payload: LoginFields) => {
  const response = await fetch(`${apiconfig.defaultUrl}${apiconfig.login}`, {
    headers: apiconfig.commonHeader,
    method: "POST",
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result as LoginResponse;
};
