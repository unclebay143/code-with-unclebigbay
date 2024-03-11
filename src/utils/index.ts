export const convertEmptyStringToNull = (str: string) =>
  str === '' ? null : str;

export const convertNullableStringToEmptyString = (str?: string | null) =>
  str ?? '';

export const convertWhiteSpaceToDash = (value: string) =>
  value.replace(/\s/g, '-'); // remove space
