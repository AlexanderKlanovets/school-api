import Joi, { Schema } from 'joi';

const teacherFiltersDtoValidationSchema: Schema = Joi.object({
  age: Joi.number().integer(),
  sex: Joi.string().valid('male', 'female', 'non-binary'),
  yearsOfExperience: Joi.number().integer(),
});

export default teacherFiltersDtoValidationSchema;
