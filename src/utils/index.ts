export const convertEmptyStringToNull = (str: string) =>
  str === '' ? null : str;

export const convertNullableStringToEmptyString = (str?: string | null) =>
  str ?? '';
