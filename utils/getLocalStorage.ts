import { UserProps } from "./interface";

export const saveUserDataLocalStorage = (data: UserProps) => {
  localStorage.setItem("users", JSON.stringify({ data }));
};

export const getUsersFromLocalStorage = () => {
  let users = {
    data: [],
  };

  if (typeof window !== "undefined") {
    users = JSON.parse(localStorage.getItem("users") || "{}");
  }
  return users;
};
