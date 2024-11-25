import React from 'react';
import { NotFoundPage } from './not-found-page';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import { Metadata } from 'next';

type Props = {};

export const metadata: Metadata = {
  title: 'Page not found | Code With Unclebigbay',
};

const PageNotFound = async (props: Props) => {
  const session = await getServerSessionWithAuthOptions();
  return <NotFoundPage session={session} />;
};

export default PageNotFound;
