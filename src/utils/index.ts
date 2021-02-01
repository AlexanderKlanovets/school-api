export const parseIntOrDefault = (
  n: string | undefined,
  def: number,
  radix = 10,
): number => {
  if (!n) return def;
  const parsed = parseInt(n, radix);
  return Number.isNaN(parsed) ? def : parsed;
};

export const removeUndefinedFields = (
  obj: Record<string, any>,
): Record<string, any> => {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((field) => {
    const fieldValue = obj[field];
    if (fieldValue !== undefined) {
      newObj[field] = fieldValue;
    }
  });
  return newObj;
};
