import { InfoProps, UserProps } from "./interface";

export const saveUserDataLocalStorage = (data: UserProps) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("users", JSON.stringify({ data }));
  }
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

export const saveDataLocalStorage = (data: InfoProps) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("items", JSON.stringify({ data }));
  }
};

export const getDataFromLocalStorage = () => {
  let items = {
    data: [],
  };

  if (typeof window !== "undefined") {
    items = JSON.parse(localStorage.getItem("items") || "{}");
  }
  return items;
};
