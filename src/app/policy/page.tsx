import React from 'react';
import { PublicLayout } from '../index-layout';
import { getServerSessionWithAuthOptions } from '@/utils/auth-options';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy | Code With Unclebigbay',
};

const PrivacyPolicy = async () => {
  const session = await getServerSessionWithAuthOptions();

  return (
    <PublicLayout session={session}>
      <div className="bg-gray-100 mt-10 rounded-md">
        <div className="mx-auto p-6 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your personal data.
            <br />
            <br />
            Please read them carefully.
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              1. Data We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may collect your name, email, payment information, and data
              about your use of the platform.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              2. How We Use Your Data
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use your data to provide and improve our services, send updates
              about your account, and manage your account.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              3. Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You can request to access, update, or delete your data at any time
              by contacting us.
            </p>
          </section>

          <p className="text-gray-700 leading-relaxed mb-6">
            For questions, reach out to{' '}
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

export default PrivacyPolicy;
