import { IncomingMessage, ServerResponse } from 'http';
import HttpMethod from './enums/httpMethod';

export type RequestParams = {
  [paramName: string]: string,
};

export type RequestHandler = (
  req: IncomingMessage,
  res: ServerResponse,
) => any | Promise<any>;

export type RequestWithParamsHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  params: RequestParams,
) => any | Promise<any>;

export type RouteMethodHandler = {
  [method in HttpMethod]?: RequestHandler | RequestWithParamsHandler
};

export type Route = {
  [url: string]: RouteMethodHandler,
};
