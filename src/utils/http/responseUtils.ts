import { ServerResponse } from 'http';

export const jsonResponse = (
  res: ServerResponse,
  body: any,
) => {
  res.setHeader('Content-Type', 'application/json');
  return JSON.stringify(body);
};

const handleRequestError = (
  res: ServerResponse,
  statusCode: number,
  message: string,
) => {
  res.statusCode = statusCode;
  res.end(jsonResponse(res, { message }));
};

export const handleBadRequest = (
  res: ServerResponse,
  message: string,
): void => {
  handleRequestError(res, 400, message);
};

export const handleNotFound = (
  res: ServerResponse,
  message: string,
): void => {
  handleRequestError(res, 404, message);
};

export const handleInternalServerError = (
  res: ServerResponse,
  message: string,
): void => {
  handleRequestError(res, 500, message);
};
