'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from '@/components/ui/globe';
import { HomeSectionHeading } from '.';
import { CurlyDraw } from './CurlyDraw';

export const GlobeSection = () => {
  return (
    <div className="flex flex-row items-center justify-center py-20 h-[55vh] md:h-auto dark:bg-black bg-white relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          {/* <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white"> */}
          <HomeSectionHeading
            heading={
              <>
                Join a{' '}
                <span className="relative whitespace-nowrap">
                  Global Community
                  <CurlyDraw />
                </span>{' '}
                of Coders
              </>
            }
            copy="Collaborate, learn, and grow with developers who share your passion for coding."
          />
          {/* </h2> */}
          {/* <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-xl mt-2 mx-auto"> */}
          {/* From beginners to experts, our community spans across the globe. */}
          {/* Collaborate, learn, and grow with developers who share your passion
            for coding.
          </p> */}
        </motion.div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
        <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
          <Globe />
        </div>
      </div>
    </div>
  );
};
