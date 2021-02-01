CREATE TYPE sexEnum AS ENUM ('male', 'female', 'non-binary');

CREATE TABLE Teacher (
  id           serial,
  firstName    varchar(50) NOT NULL,
  lastName     varchar(50) NOT NULL,
  dateOfBirth  date NOT NULL,
  sex          sexEnum NOT NULL,
  hireDate     date NOT NULL,
  email        varchar(100) NOT NULL
);

ALTER TABLE Teacher ADD CONSTRAINT pkTeacher PRIMARY KEY (id);

CREATE TYPE classroomTypeEnum AS ENUM ('laboratory', 'lecture-room');

CREATE TABLE Classroom (
  id               serial,
  roomNumber       integer NOT NULL CHECK (roomNumber >= 0),
  seatingCapacity  integer NOT NULL CHECK (seatingCapacity > 0),
  classroomType    classroomTypeEnum NOT NULL
);

ALTER TABLE Classroom ADD CONSTRAINT pkClassroom PRIMARY KEY (id);

CREATE TYPE lessonSubjectEnum AS ENUM (
  'math',
  'physics',
  'english',
  'biology',
  'chemistry',
  'literature',
  'history'
);

CREATE TYPE dayOfTheWeekEnum AS ENUM (
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
);

CREATE TABLE Lesson (
  id             serial,
  teacherId      integer NOT NULL,
  classroomId    integer NOT NULL,
  lessonSubject  lessonSubjectEnum NOT NULL,
  dayOfTheWeek   dayOfTheWeekEnum NOT NULL,
  startTime      time NOT NULL,
  finishTime     time NOT NULL
);

ALTER TABLE Lesson ADD CONSTRAINT pkLesson PRIMARY KEY (id);
ALTER TABLE Lesson ADD CONSTRAINT fkLessonTeacherId FOREIGN KEY (teacherId) REFERENCES Teacher (id) ON DELETE CASCADE;
ALTER TABLE Lesson ADD CONSTRAINT fkLessonClassroomId FOREIGN KEY (classroomId) REFERENCES Classroom (id) ON DELETE CASCADE;