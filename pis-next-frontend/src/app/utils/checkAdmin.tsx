"use client";
const checkAdmin = () => {
  const admin = localStorage.getItem("admin");
  if (admin) {
    return true;
  }
  return false;
};

export default checkAdmin;
