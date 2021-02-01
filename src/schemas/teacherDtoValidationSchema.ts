import Joi, { Schema } from 'joi';

const teacherDtoFieldsValidation = {
  firstName: Joi.string().min(1).max(50),
  lastName: Joi.string().min(1).max(50),
  dateOfBirth: Joi.date().less('now'),
  sex: Joi.string().valid('male', 'female', 'non-binary'),
  hireDate: Joi.date().less('now'),
  email: Joi.string().email(),
};

export const partialTeacherDtoValidationSchema: Schema = Joi.object({
  ...teacherDtoFieldsValidation,
});

export const teacherDtoValidationSchema: Schema = partialTeacherDtoValidationSchema
  .fork(
    Object.keys(teacherDtoFieldsValidation),
    (schema: Schema) => schema.required(),
  );
