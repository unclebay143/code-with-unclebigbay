'use client';

import React from 'react';
import { ModalWrapper } from '../molecules/dashboard/modal-wrapper';
import {
  ArrowExternalLink01,
  Button,
  Github,
  IconButton,
  X,
} from '@hashnode/matrix-ui';
import { handleAuthentication } from '@/utils/auth';

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
  return (
    <ModalWrapper open={isOpen} onOpenChange={close} maxWidth={480}>
      <section className="flex flex-col gap-4">
        <section>
          <section className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-800 text-lg">
              <span className="capitalize">{type} </span>
              with GitHub
            </h3>
            <IconButton Icon={X} size="sm" onClick={close} />
          </section>
          <p className="text-sm text-slate-600">
            {type === 'login' &&
              'Welcome back! Please log in with your GitHub account to access your profile, settings, and continue where you left off.'}

            {type === 'signup' &&
              'Connect with your GitHub account to unlock personalized features, and enhance your experience with us.'}
          </p>
        </section>
        <div className="flex flex-col gap-2 items-center">
          <Button
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
          </Button>
          <div className="flex items-center text-xs gap-1 text-slate-600 font-medium">
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
          </div>
        </div>
      </section>
    </ModalWrapper>
  );
};
