import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema';

export function validateJSON(data: any,schema:JSONSchema7) {

  const ajv = new Ajv();
  const validateFn = ajv.compile(schema);
  return validateFn(data);
};
