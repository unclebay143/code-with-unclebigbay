import React from 'react';
import { PublicLayout } from '../index-layout';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of use | Code With Unclebigbay'
};

const TermsOfUse = async () => {
  const session = await getServerSessionWithAuthOptions();

  return (
    <PublicLayout session={session} hideFooter>
      <div className="bg-gray-100 mt-10 rounded-md">
        <div className="mx-auto p-6 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Terms of Use
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to CodeWithUncleBigBay! By accessing or using our platform,
            you agree to the following terms.
            <br />
            <br />
            Please read them carefully.
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              1. Use of the Platform
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You may use this platform to access courses, participate in
              hackathons, and other resources we provide. You must not misuse
              the platform for any illegal activities.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              2. User Responsibilities
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for keeping your account secure. Do not share
              your login credentials with others.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              3. Content Ownership
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Content you upload remains yours, but you grant us permission to
              display it on the platform. Ensure your content does not violate
              copyright laws.
            </p>
          </section>

          <p className="text-gray-700 leading-relaxed mb-6">
            For further details, please contact us at{' '}
            <a
              href="mailto:codewithunclebigbay@gmail.com"
              className="text-blue-600 underline"
            >
              codewithunclebigbay@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default TermsOfUse;
