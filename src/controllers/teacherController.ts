import { IncomingMessage, ServerResponse } from 'http';
import Joi from 'joi';
import { TeacherDto } from '../dto/teacherDto';
import { TeacherFiltersDto } from '../dto/teacherFiltersDto';
import { Teacher } from '../models/teacher';
import { RequestParams } from '../routing/routingTypes';
import {
  partialTeacherDtoValidationSchema,
  teacherDtoValidationSchema,
} from '../schemas/teacherDtoValidationSchema';
import teacherFiltersDtoValidationSchema from '../schemas/teacherFiltersDtoValidationSchema';
import { TeacherServiceInterface } from '../services/teacherServiceInterface';
import { parseQuery, receiveBody } from '../utils/http/requestUtils';
import {
  handleBadRequest,
  handleInternalServerError,
  handleNotFound,
  jsonResponse,
} from '../utils/http/responseUtils';
import Logger from '../utils/logger';

export default class TeacherController {
  constructor(
    private readonly teacherService: TeacherServiceInterface,
    private readonly logger: Logger,
  ) { }

  async get(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const url = req.url!;
    const query = parseQuery(url);

    let teacherFiltersDto: TeacherFiltersDto;
    try {
      teacherFiltersDto = Joi.attempt(query, teacherFiltersDtoValidationSchema);
    } catch (error) {
      handleBadRequest(res, error.details[0].message);
      return;
    }

    let teachers: Teacher[];
    try {
      teachers = await this.teacherService.get(teacherFiltersDto);
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      const message = 'Something went wrong while processing your request.';
      handleInternalServerError(res, message);
      return;
    }

    res.end(jsonResponse(res, teachers));
  }

  async getById(
    req: IncomingMessage,
    res: ServerResponse,
    params: RequestParams,
  ): Promise<void> {
    let id: number;

    try {
      id = Joi.attempt(params.id, Joi.number().integer().required());
    } catch (error) {
      handleBadRequest(res, 'Invalid ID parameter value.');
      return;
    }

    let teacher: Teacher;
    try {
      teacher = await this.teacherService.getById(id);
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      const message = 'Something went wrong while processing your request.';
      handleInternalServerError(res, message);
      return;
    }

    if (!teacher) {
      handleNotFound(res, `Teacher with id=${id} was not found.`);
      return;
    }

    res.end(jsonResponse(res, teacher));
  }

  async getTargetMathTeachers(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    let teachers: Teacher[];
    try {
      teachers = await this.teacherService.getTargetMathTeachers();
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      const message = 'Something went wrong while processing your request.';
      handleInternalServerError(res, message);
      return;
    }

    res.end(jsonResponse(res, teachers));
  }

  async save(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const result = await receiveBody(req);
    if (result.error) {
      handleBadRequest(res, 'Invalid body.');
      return;
    }

    let teacherDto: TeacherDto;
    try {
      teacherDto = Joi.attempt(result.body, teacherDtoValidationSchema);
    } catch (error) {
      handleBadRequest(res, error.details[0].message);
      return;
    }

    let savedTeacher: Teacher;
    try {
      savedTeacher = await this.teacherService.save(teacherDto);
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      const message = 'Something went wrong while processing your request.';
      handleInternalServerError(res, message);
      return;
    }

    res.end(jsonResponse(res, savedTeacher));
  }

  async update(
    req: IncomingMessage,
    res: ServerResponse,
    params: RequestParams,
  ): Promise<void> {
    let id: number;

    try {
      id = Joi.attempt(params.id, Joi.number().integer().required());
    } catch (error) {
      handleBadRequest(res, 'Invalid ID parameter value.');
      return;
    }

    const result = await receiveBody(req);
    if (result.error) {
      handleBadRequest(res, 'Invalid body.');
      return;
    }

    let fieldsToUpdate: Partial<TeacherDto>;
    try {
      fieldsToUpdate = Joi.attempt(
        result.body,
        partialTeacherDtoValidationSchema,
      );
    } catch (error) {
      handleBadRequest(res, error.details[0].message);
      return;
    }

    let updatedTeacher: Teacher;
    try {
      updatedTeacher = await this.teacherService.update(id, fieldsToUpdate);
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      const message = 'Something went wrong while processing your request.';
      handleInternalServerError(res, message);
      return;
    }

    res.end(jsonResponse(res, updatedTeacher));
  }

  async delete(
    req: IncomingMessage,
    res: ServerResponse,
    params: RequestParams,
  ): Promise<void> {
    let id: number;

    try {
      id = Joi.attempt(params.id, Joi.number().integer().required());
    } catch (error) {
      handleBadRequest(res, 'Invalid ID parameter value.');
      return;
    }

    let rowsAffected: number;
    try {
      rowsAffected = await this.teacherService.delete(id);
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      const message = 'Something went wrong while processing your request.';
      handleInternalServerError(res, message);
      return;
    }

    if (!rowsAffected) {
      handleNotFound(res, `Teacher with id=${id} was not found.`);
      return;
    }

    res.end(jsonResponse(res, {
      message: 'Successfully deleted.',
    }));
  }
}
