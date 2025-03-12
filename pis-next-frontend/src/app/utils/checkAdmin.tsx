"use client";
const checkAdmin = () => {
  const admin = localStorage.getItem("accessToken");
  if (admin) {
    return true;
  }
  return false;
};

export default checkAdmin;
