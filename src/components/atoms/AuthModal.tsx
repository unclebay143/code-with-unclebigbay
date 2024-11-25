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
              startIcon={BrandGoogle}
              size="sm"
              appearance="secondary-slate"
              onClick={() => {
                if (nextUrl)
                  return handleAuthentication({ nextUrl, provider: 'google' });
                handleAuthentication({ provider: 'google' });
              }}
            >
              Continue with Google
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
