import Sex from '../models/enums/sex';

export interface TeacherFiltersDto {
  sex: Sex;
  age: number;
  yearsOfExperience: number;
}
