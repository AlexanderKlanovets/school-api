import Sex from '../models/enums/sex';

export interface TeacherDto {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: Sex;
  hireDate: Date;
  email: string;
}
