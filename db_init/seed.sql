-- For debugging purposes.

TRUNCATE TABLE Teacher, Classroom RESTART IDENTITY CASCADE;

INSERT INTO Classroom (roomNumber, seatingCapacity, classroomType) VALUES
  (100, 30,   'laboratory'),
  (101, 15,   'laboratory'),
  (102, 20,   'laboratory'),
  (200, 60,   'lecture-room'),
  (205, 100,  'lecture-room');

INSERT INTO Teacher (
  firstName, lastName, dateOfBirth, sex, hireDate, email
) VALUES
  ('Alex',      'Brown',  '1975-08-12', 'male',   '1990-05-20', 'brown@mail.com'),
  ('George',    'Page',   '1974-07-15', 'male',   '1992-06-21', 'page@mail.com'),
  ('Jessica',   'Smith',  '1980-03-09', 'female', '2004-07-22', 'smith@mail.com'),
  ('Victoria',  'Downey', '1985-01-26', 'female', '2010-08-23', 'downey@mail.com'),
  ('Michael',   'Fox',    '1990-05-10', 'male',   '2015-09-24', 'fox@mail.com'),
  ('Olivia',    'Stone',  '1990-06-30', 'female', '2018-10-25', 'stone@mail.com');

INSERT INTO Lesson (
  teacherId, classroomId, lessonSubject, dayOfTheWeek, startTime, finishTime
) VALUES
  (1, 1, 'math', 'Thursday', '10:00', '11:30'),
  (1, 2, 'math', 'Tuesday', '10:00', '11:30'),
  (2, 2, 'physics', 'Tuesday', '08:30', '10:00'),
  (3, 3, 'biology', 'Friday', '08:30', '10:00'),
  (5, 4, 'history', 'Tuesday', '08:30', '10:00'),
  (4, 1, 'math', 'Thursday', '11:30', '13:00');