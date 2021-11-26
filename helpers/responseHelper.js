const successResponse = (
  req,
  res,
  message = "",
  data,
  token = "",
  code = 200
) =>
  res.send({
    code,
    message,
    data,
    token,
    success: true,
  });

const errorResponse = (
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500,
  error = {}
) => {
  res.status(500).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
