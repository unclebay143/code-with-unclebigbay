'use client';

import React from 'react';
import { ModalWrapper } from '../molecules/dashboard/modal-wrapper';
import {
  ArrowExternalLink01,
  BrandGoogle,
  Button,
  Github,
  IconButton,
  X,
} from '@hashnode/matrix-ui';
import { handleAuthentication } from '@/utils/auth';
import Link from 'next/link';

type Props = {
  isOpen: boolean;
  close: () => void;
  type: 'login' | 'signup';
  nextUrl?: string;
};

export const AuthModal = ({
  isOpen,
  close,
  type = 'login',
  nextUrl,
}: Props) => {
  const isSignup = type === 'signup';
  return (
    <ModalWrapper open={isOpen} onOpenChange={close} maxWidth={480}>
      <section className="flex flex-col gap-4">
        <section className="flex flex-col gap-1">
          <section className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-800 text-lg">
              <span>{type === 'login' ? 'Log in' : 'Sign up'} </span> to Code
              with Unclebigbay
            </h3>
            <IconButton Icon={X} size="sm" onClick={close} />
          </section>
          <p className="text-sm text-slate-600">
            {type === 'login' &&
              'Welcome back! To personalize your experience and continue where you left off'}

            {type === 'signup' &&
              'Unlock personalized features, and enhance your experience on the platform.'}
          </p>
        </section>
        <section className="flex flex-col gap-2 justify-between">
          {/* <Button
            appearance="primary-slate"
            size="sm"
            width="full"
            startIcon={Github}
            onClick={() => {
              if (nextUrl) return handleAuthentication({ nextUrl });
              handleAuthentication();
            }}
          >
            <span className="capitalize">
              {type} <span className="lowercase">with </span>
              GitHub
            </span>
          </Button> */}
          <div className="flex gap-2 flex-wrap justify-center sm:flex-row sm:flex-nowrap sm:items-center">
            <Button
              width="full"
              startIcon={Github}
              size="sm"
              appearance="primary-slate"
              onClick={() => {
                if (nextUrl)
                  return handleAuthentication({ nextUrl, provider: 'github' });
                handleAuthentication({ provider: 'github' });
              }}
            >
              Continue with GitHub
            </Button>
            <Button
              width="full"
              // startIcon={BrandGoogle}
              size="sm"
              appearance="secondary-slate"
              onClick={() => {
                if (nextUrl)
                  return handleAuthentication({ nextUrl, provider: 'google' });
                handleAuthentication({ provider: 'google' });
              }}
            >
              <div className="flex gap-2 whitespace-nowrap items-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 48 48"
                  enableBackground="new 0 0 48 48"
                  className="h-5 w-5"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Continue with Google
              </div>
            </Button>
          </div>

          {isSignup && (
            <div className="text-xs">
              By signing up, you agree to our{' '}
              <Link
                className="text-blue-500 hover:text-blue-600 hover:underline"
                href="/terms"
              >
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link
                className="text-blue-500 hover:text-blue-600 hover:underline"
                href="privacy-policy"
              >
                Privacy Policy
              </Link>
              .
            </div>
          )}
          {/* <div className="flex items-center text-xs gap-1 text-slate-600 font-medium">
            <h3>New to GitHub?</h3>
            <Button
              appearance="link-slate"
              size="xs"
              endIcon={ArrowExternalLink01}
            >
              <a
                href="https://dub.sh/dont-know-gh-guide"
                target="_blank"
                rel="noopener"
                className="text-xs"
              >
                Learn more
              </a>
            </Button>
          </div> */}
        </section>
      </section>
    </ModalWrapper>
  );
};
