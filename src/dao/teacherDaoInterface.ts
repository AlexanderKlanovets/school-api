import { TeacherDto } from '../dto/teacherDto';
import { TeacherFiltersDto } from '../dto/teacherFiltersDto';
import { Teacher } from '../models/teacher';

export interface TeacherDaoInterface {
  get(filters?: Partial<TeacherFiltersDto>): Promise<Teacher[]>;
  getById(id: number): Promise<Teacher>;
  getTargetMathTeachers(): Promise<Teacher[]>;
  save(teacherDto: TeacherDto): Promise<Teacher>;
  update(id: number, fieldsToUpdate: Partial<TeacherDto>): Promise<Teacher>;
  delete(id: number): Promise<number>;
}
