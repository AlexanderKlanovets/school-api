import Sex from './enums/sex';

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  sex: Sex;
  age: number;
  hireDate: Date;
  email: string;
}
