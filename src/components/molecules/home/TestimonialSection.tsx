import React from 'react';
import Testimonials from '../../atoms/Testimonials';
import { HomeSectionHeading } from '.';
import { CurlyDraw } from './CurlyDraw';

export const TestimonialSection = () => {
  return (
    <section className="py-[128px]">
      <HomeSectionHeading
        heading={
          <>
            What my <br className="md:hidden" />
            <span className="relative whitespace-nowrap">
              Students Say
              <CurlyDraw />
            </span>
          </>
        }
        copy="Hear directly from our students about their experiences and how my
        courses have impacted their journey."
      />
      <hr className="pb-1 invisible" />
      <Testimonials />
    </section>
  );
};
