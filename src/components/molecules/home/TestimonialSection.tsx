import React from 'react';
import { HomeSectionHeading } from '.';
import { CurlyDraw } from './CurlyDraw';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

const placeholder =
  'https://cdn.hashnode.com/res/hashnode/image/upload/v1731780567556/7484be9c-e706-4450-8e81-fa593405796e.png?auto=compress';
export const animatedTestimonialsData = [
  {
    name: 'Damilola Oyedunmade',
    src: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1731779960897/9376daca-13e9-4881-b01d-146329674238.jpeg?auto=compress',
    designation: 'Student',
    quote:
      'This is a great Christmas present Unclebigbay. Excited about the journey ahead.',
  },
  {
    name: 'Mba Nnenna',
    src: placeholder,
    designation: 'Student',
    quote:
      'Nice content! You have me onboard! I have subscribed and turn on my notifications cos I can’t miss out on this awesome opportunity. Keep up unclebigbay!',
  },
  {
    name: 'Victor Josiah',
    src: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1731780038690/39998319-c8be-4010-815d-548468ed5d20.jpeg?auto=compress',
    designation: 'Student',
    quote:
      'My boss, it has been an amazing journey with you and your community, I will be recommending this channel to all my friends that have interest in coding, because this is where I started.',
  },
  {
    name: 'YouTube User',
    src: placeholder,
    designation: 'Student',
    quote:
      "Amazing work Unclebigbay. I came here from x and I've learnt so much already. I've subscribed and turned on notification. Keep up the good work.",
  },
];

export const TestimonialSection = () => {
  return (
    <section className="py-[128px]">
      <HomeSectionHeading
        heading={
          <>
            What our <br className="md:hidden" />
            <span className="relative whitespace-nowrap">
              Community Says
              <CurlyDraw />
            </span>
          </>
          // <>
          //   What my <br className="md:hidden" />
          //   <span className="relative whitespace-nowrap">
          //     Students Say
          //     <CurlyDraw />
          //   </span>
          // </>
        }
        // copy="Hear directly from our students about their experiences and how my
        // courses have impacted their journey."
        copy="Hear directly from our community members
            about their experiences and how our courses have impacted their journey."
      />
      <hr className="pb-1 invisible" />

      {/* <Testimonials /> */}
      <AnimatedTestimonials testimonials={animatedTestimonialsData} />
    </section>
  );
};
