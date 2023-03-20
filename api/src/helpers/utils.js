export const generateRequestBody = (status, statusCode, message, data) => {
  return {
    status,
    statusCode,
    message,
    data,
  };
};

export const convertDateTime = (date) => {
  return `${date.toJSON().slice(0, 10)} ${date.toJSON().slice(11, 23)}`;
};
