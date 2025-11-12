// utils/auth.ts
export const getUserRole = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).role : null;
};
