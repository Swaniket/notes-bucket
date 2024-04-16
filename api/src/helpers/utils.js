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

export const generateResetPasswordLink = (token) => {
  let url = "";
  const env = process.env.NODE_ENV;

  if (env === "development") {
    const port = process.env.CLIENT_PORT;
    url = `http://localhost:${port}/reset-password?token=${token}`;
  } else {
    url = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  }

  return url;
};
