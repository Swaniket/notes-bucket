export const generateRequestBody = (status, statusCode, message, data) => {
  return {
    status,
    statusCode,
    message,
    data,
  };
};
