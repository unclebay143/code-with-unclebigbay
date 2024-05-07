import { Student } from './types';

type flagType = keyof Student['betaFeatures'];

export const hasAccessToBetaFeature = (student: Student, flag: flagType) => {
  if (student && student.betaFeatures && student.betaFeatures[flag]) {
    return true;
  }
  return false;
};
