'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { HomeSectionHeading } from '.';
import { Students } from '@/utils/types';
import { BrandXTwitter, IconButton, Linkedin } from '@hashnode/matrix-ui';
import { CurlyDraw } from './CurlyDraw';
import { showUpMotion } from '@/utils';

type CommunityMembersSectionProps = {
  students: Students;
};

export const CommunityMembersSection = ({
  students,
}: CommunityMembersSectionProps) => {
  return (
    <section className="flex flex-col gap-14">
      <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-4">
        <HomeSectionHeading
          heading={
            <>
              You are in <br className="md:hidden" />
              <span className="relative whitespace-nowrap">
                Good Company
                <CurlyDraw />
              </span>
            </>
          }
          copy="Join happy developers of all levels on their web development journey."
        />
      </div>
      <section className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-8">
        {students?.map(({ _id, fullName, username, stack, photo, socials }) => {
          const x = socials?.x;
          const linkedin = socials?.linkedin;
          const showSocial = x
            ? { url: x, logo: BrandXTwitter }
            : linkedin
              ? { url: linkedin, logo: Linkedin }
              : null;

          return (
            <motion.div
              variants={showUpMotion}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={`communityMembers-${_id}`}
              className="flex flex-col border rounded overflow-hidden"
            >
              <Link
                href={`/@${username}`}
                rel="noopener"
                className="mx-auto overflow-hidden lg:h-[200px] w-full transition transform duration-500 ease-in-out hover:scale-105 "
              >
                <Image
                  src={photo}
                  height={200}
                  width={200}
                  className="w-full"
                  alt={`${username}'s profile image`}
                />
              </Link>
              <div className="px-4 pb-4 pt-3">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={`/@${username}`}
                    rel="noopener"
                    className="font-medium text-slate-950 hover:underline"
                  >
                    {fullName}
                  </Link>
                  {showSocial && (
                    <Link href={showSocial.url} target="_blank" rel="noopener">
                      <IconButton
                        Icon={showSocial.logo}
                        appearance="secondary"
                        size="sm"
                        iconSolid
                      />
                    </Link>
                  )}
                </div>
                <p className="text-slate-600 text-sm capitalize">
                  {stack} developer
                </p>
              </div>
            </motion.div>
          );
        })}
      </section>
    </section>
  );
};
