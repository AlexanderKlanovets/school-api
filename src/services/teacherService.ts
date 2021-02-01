import { TeacherDaoInterface } from '../dao/teacherDaoInterface';
import { TeacherDto } from '../dto/teacherDto';
import { TeacherFiltersDto } from '../dto/teacherFiltersDto';
import { Teacher } from '../models/teacher';
import { TeacherServiceInterface } from './teacherServiceInterface';

export default class TeacherService implements TeacherServiceInterface {
  constructor(private readonly teacherDao: TeacherDaoInterface) {}

  async get(filters?: Partial<TeacherFiltersDto>): Promise<Teacher[]> {
    return this.teacherDao.get(filters);
  }

  async getById(id: number): Promise<Teacher> {
    return this.teacherDao.getById(id);
  }

  async getTargetMathTeachers(): Promise<Teacher[]> {
    return this.teacherDao.getTargetMathTeachers();
  }

  async save(teacherDto: TeacherDto): Promise<Teacher> {
    return this.teacherDao.save(teacherDto);
  }

  async update(id: number, fieldsToUpdate: Partial<TeacherDto>): Promise<Teacher> {
    return this.teacherDao.update(id, fieldsToUpdate);
  }

  async delete(id: number): Promise<number> {
    return this.teacherDao.delete(id);
  }
}
