import DayOfTheWeek from './enums/dayOfTheWeek';
import SubjectTitle from './enums/subjectTitle';

export interface Lesson {
  id: number;
  teacherId: number;
  classroomId: number;
  subjectTitle: SubjectTitle;
  dayOfTheWeek: DayOfTheWeek;
  startTime: string;
  finishTime: string;
}
