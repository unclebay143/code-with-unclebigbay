import { getServerSessionWithAuthOptions } from './auth-options';

export const getSession = async () => {
  const session = await getServerSessionWithAuthOptions();
  return session;
};
