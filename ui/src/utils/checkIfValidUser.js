export const checkIfValidUser = (user) => {
  if (user && user.firstName && user.lastName && user.email && user.token)
    return true;
  return false;
};
