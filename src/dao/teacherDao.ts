import { DbInterface } from '../database';
import { TeacherDto } from '../dto/teacherDto';
import { TeacherFiltersDto } from '../dto/teacherFiltersDto';
import { Teacher } from '../models/teacher';
import { removeUndefinedFields } from '../utils';
import { TeacherDaoInterface } from './teacherDaoInterface';

export default class TeacherDao implements TeacherDaoInterface {
  constructor(private readonly db: DbInterface) { }

  private static buildGetCondition(filtersNames: string[]): string {
    return filtersNames
      .map((filter, i) => {
        if (filter === 'yearsOfExperience') {
          return `EXTRACT('year' from AGE(hireDate)) >= $${i + 1}`;
        }
        if (filter === 'age') {
          return `EXTRACT('year' from AGE(dateOfBirth)) = $${i + 1}`;
        }
        return `${filter} = $${i + 1}`;
      })
      .join(' AND ');
  }

  async get(filters?: Partial<TeacherFiltersDto>): Promise<Teacher[]> {
    let sql = 'SELECT * FROM Teacher';

    if (filters) {
      const definedFilters = removeUndefinedFields(filters);

      const condition = TeacherDao.buildGetCondition(Object.keys(definedFilters));

      if (condition.length > 0) {
        sql += ` WHERE ${condition};`;
        const values = Object.values(definedFilters);
        const { rows } = await this.db.query(sql, values);
        return rows;
      }
    }

    sql += ';';
    const { rows } = await this.db.query(sql);
    return rows;
  }

  async getById(id: number): Promise<Teacher> {
    const sql = 'SELECT * FROM Teacher WHERE id = $1;';
    const { rows } = await this.db.query(sql, [id]);
    return rows[0];
  }

  async getTargetMathTeachers(): Promise<Teacher[]> {
    const fields = [
      'id', 'firstName', 'lastName', 'sex',
      'dateOfBirth', 'hireDate', 'email',
    ].map((field) => `Teacher.${field}`).join(', ');

    let sql = `SELECT ${fields} FROM Lesson `;
    sql += 'INNER JOIN Teacher ON Lesson.teacherId = Teacher.id ';
    sql += 'INNER JOIN Classroom ON Lesson.classroomId = Classroom.id ';
    sql += 'WHERE EXTRACT(\'year\' from AGE(Teacher.hireDate)) >= 10 ';
    sql += 'AND Classroom.roomNumber = 100 ';
    sql += 'AND Lesson.lessonSubject = \'math\' ';
    sql += 'AND Lesson.dayOfTheWeek = \'Thursday\' ';
    sql += 'AND Lesson.startTime >= \'8:30\' ';
    sql += 'AND Lesson.finishTime <= \'14:30\';';

    const { rows } = await this.db.query(sql);
    return rows;
  }

  async save(teacherDto: TeacherDto): Promise<Teacher> {
    const fields = Object.keys(teacherDto);
    const valuesPlaceholders = fields.map((key, i) => `$${i + 1}`).join(', ');

    let sql = `INSERT INTO Teacher (${fields.join(', ')})`;
    sql += ` VALUES (${valuesPlaceholders}) RETURNING *;`;

    const result = await this.db.query(sql, Object.values(teacherDto));
    return result.rows[0];
  }

  async update(
    id: number,
    fieldsToUpdate: Partial<TeacherDto>,
  ): Promise<Teacher> {
    const definedFields = removeUndefinedFields(fieldsToUpdate);
    const fieldNames = Object.keys(definedFields);

    const setPlaceholders = fieldNames
      .map((field, i) => `${field} = $${i + 1}`)
      .join(', ');

    const idPlaceholder = `$${fieldNames.length + 1}`;

    let sql = `UPDATE Teacher SET ${setPlaceholders}`;
    sql += ` WHERE id = ${idPlaceholder} RETURNING *;`;

    const values = [...Object.values(definedFields), id];
    const result = await this.db.query(sql, values);
    return result.rows[0];
  }

  async delete(id: number): Promise<number> {
    const sql = 'DELETE FROM Teacher WHERE id = $1;';
    const result = await this.db.query(sql, [id]);
    return result.rowCount;
  }
}
