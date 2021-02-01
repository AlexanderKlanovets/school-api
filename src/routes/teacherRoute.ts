import { IncomingMessage, ServerResponse } from 'http';
import TeacherController from '../controllers/teacherController';
import HttpMethod from '../routing/enums/httpMethod';
import { RequestParams, Route } from '../routing/routingTypes';

const getTeacherRoute = (
  teacherController: TeacherController,
): Route => ({
  '/teachers': {
    [HttpMethod.GET]: (
      req: IncomingMessage,
      res: ServerResponse,
    ) => teacherController.get(req, res),
    [HttpMethod.POST]: (
      req: IncomingMessage,
      res: ServerResponse,
    ) => teacherController.save(req, res),
  },
  '/teacher/:id': {
    [HttpMethod.GET]: (
      req: IncomingMessage,
      res: ServerResponse,
      params: RequestParams,
    ) => teacherController.getById(req, res, params),
    [HttpMethod.PATCH]: (
      req: IncomingMessage,
      res: ServerResponse,
      params: RequestParams,
    ) => teacherController.update(req, res, params),
    [HttpMethod.DELETE]: (
      req: IncomingMessage,
      res: ServerResponse,
      params: RequestParams,
    ) => teacherController.delete(req, res, params),
  },
  '/target-math-teachers': {
    [HttpMethod.GET]: (
      req: IncomingMessage,
      res: ServerResponse,
    ) => teacherController.getTargetMathTeachers(req, res),
  },
});

export default getTeacherRoute;
