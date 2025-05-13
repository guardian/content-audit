export const okResponse = (data: any) => ({
  body: JSON.stringify({
    status: "ok",
    data,
  }),
  statusCode: 200,
});

export const errorResponse = (statusCode: number, error: unknown) => {
  const message =
    error instanceof Error
      ? error.message
      : error?.toString() ?? "Unknown error";
  return {
    body: JSON.stringify({
      status: "error",
      message,
    }),
    statusCode,
  };
};
