import ClassroomType from './enums/classroomType';

export interface Classroom {
  id: number;
  roomNumber: number;
  seatingCapacity: number;
  classroomType: ClassroomType;
}
