import { IncomingMessage, ServerResponse } from 'http';
import { handleNotFound } from '../utils/http/responseUtils';
import HttpMethod from './enums/httpMethod';
import { RequestParams, RouteMethodHandler, Route } from './routingTypes';

export default class Router {
  #routing: Route = {};

  #matching: Array<[RegExp, string[], RouteMethodHandler]> = [];

  private static parseRouteWithParams(route: string): [RegExp, string[]] {
    const requestParamRx = /:([^/]+)/g;

    const paramsNames = route.match(requestParamRx)!
      .map((paramName) => paramName.slice(1));

    const rx = new RegExp(route.replace(requestParamRx, '([^/]+)'));

    return [rx, paramsNames];
  }

  private findMatchingRouteWithParams(
    url: string,
  ): [RequestParams, RouteMethodHandler] | undefined {
    let paramsAndHandlers: [RequestParams, RouteMethodHandler] | undefined;
    /* eslint-disable-next-line */
    for (let i = 0; i < this.#matching.length; i++) {
      const [rx, paramNames, handlers] = this.#matching[i];
      const paramValues = url!.match(rx);

      if (paramValues && paramValues[0] === url) {
        paramValues.shift();
        const requestParamsNames = paramNames;
        const params: RequestParams = {};
        /* eslint-disable-next-line */
        for (let j = 0; j < requestParamsNames.length; j++) {
          params[requestParamsNames[j]] = paramValues[j];
        }
        paramsAndHandlers = [params, handlers];
        return paramsAndHandlers;
      }
    }

    return paramsAndHandlers;
  }

  register(routePrefix: string | undefined, route: Route): void {
    Object.keys(route).forEach((url) => {
      const fullRoute = routePrefix ? (routePrefix + url) : url;
      const methodHandlers = route[url];

      if (fullRoute.includes(':')) {
        const [rx, paramsNames] = Router.parseRouteWithParams(fullRoute);
        this.#matching.push([rx, paramsNames, methodHandlers]);
      } else {
        this.#routing[fullRoute] = methodHandlers;
      }
    });
  }

  dispatch(req: IncomingMessage, res: ServerResponse): void {
    const url = req.url!.split('?')[0];
    const method = req.method!;
    let methodHandlers = this.#routing[url!];
    let requestParams: RequestParams = {};

    if (!methodHandlers) {
      const match = this.findMatchingRouteWithParams(url!);
      if (match) {
        [requestParams, methodHandlers] = match;
      }
    }

    if (methodHandlers?.[method as HttpMethod]) {
      methodHandlers[method as HttpMethod]!(req, res, requestParams);
    } else {
      handleNotFound(res, `Cannot ${req.method} by URL='${req.url}'.`);
    }
  }
}
