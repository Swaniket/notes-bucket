export const generateRequestBody = (status, statusCode, message, data) => {
  return {
    status,
    statusCode,
    message,
    data,
  };
};

export const convertDateTime = (date) => {
  const jsonDate = new Date(date).toISOString().toString();
  return `${jsonDate.slice(0, 10)} ${jsonDate.slice(11, 23)}`;
};
