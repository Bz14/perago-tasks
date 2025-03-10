const AuthMiddleware = async (c, next) => {
  console.log("AuthMiddleware");
  await next();
};

export default AuthMiddleware;
