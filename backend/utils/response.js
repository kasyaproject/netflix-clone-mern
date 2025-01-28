export const OK = (res, statusCode, data, message) => {
  res.status(statusCode).json({
    isError: false,
    data,
    message,
  });
};

export const ERR = (res, statusCode, message) => {
  res.status(statusCode).json({
    isError: true,
    message,
  });
};
