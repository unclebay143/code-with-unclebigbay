'use client';

import React from 'react';
import { Button } from '@hashnode/matrix-ui';
import { Session } from 'next-auth';
import Link from 'next/link';
import { PublicLayout } from './index-layout';

export const NotFoundPage = ({ session }: { session: Session | null }) => {
  return (
    <PublicLayout session={session} hideFooter>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col justify-center mt-10">
          <section className="p-6 sm:p-10 flex flex-col justify-center rounded-md items-start bg-gray-100 text-gray-800">
            <section className="max-w-4xl">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Oops! Page Not Found
              </h1>
              <p className="text-base sm:text-lg mb-6 text-gray-600">
                It seems the page you&apos;re looking for doesn&apos;t exist or
                has been moved.
              </p>
            </section>

            <section className="max-w-4xl">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
                What You Can Do Next:
              </h2>
              <ul className="list-disc list-inside space-y-3 text-left ml-3">
                <li className="text-gray-700">
                  <span className="font-medium">Check the URL</span> for any
                  typos or errors.
                </li>
                <li className="text-gray-700">
                  Use the <span className="font-medium">navigation bar</span>{' '}
                  above to find your way.
                </li>
                <li className="text-gray-700">
                  Visit our{' '}
                  <Link href="/" className="text-blue-500 hover:underline">
                    Home Page
                  </Link>{' '}
                  to explore available resources.
                </li>
                <li className="text-gray-700">
                  <Link
                    href="/help-centers"
                    className="text-blue-500 hover:underline"
                  >
                    Reach out
                  </Link>{' '}
                  to us for assistance if you think something is broken.
                </li>
              </ul>
            </section>

            <footer className="mt-8 sm:mt-10 text-center">
              <Button asChild size="sm">
                <Link href={session ? '/courses' : '/'}>
                  Return to {session ? 'courses' : 'Home'}
                </Link>
              </Button>
            </footer>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};
