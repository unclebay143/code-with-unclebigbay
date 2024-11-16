import { Metadata } from 'next';
import React from 'react';
import { HelpCenters } from './help-centers';

export const metadata: Metadata = {
  alternates: {
    canonical: '/help-centers',
  },
};

const Page = () => {
  return <HelpCenters />;
};

export default Page;
