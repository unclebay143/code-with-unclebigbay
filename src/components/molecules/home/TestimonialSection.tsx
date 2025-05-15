import React from 'react';
import { HomeSectionHeading } from '.';
import { CurlyDraw } from './CurlyDraw';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

const placeholder =
  'https://cdn.hashnode.com/res/hashnode/image/upload/v1731780567556/7484be9c-e706-4450-8e81-fa593405796e.png?auto=compress,format&format=webp';
export const animatedTestimonialsData = [
  {
    name: 'Damilola Oyedunmade',
    src: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1731779960897/9376daca-13e9-4881-b01d-146329674238.jpeg?auto=compress,format&format=webp',
    designation: 'Frontend Developer',
    year: '2022',
    quote:
      "As one of Unclebigbay's first students, I've seen the community grow from strength to strength. The structured learning path and mentorship helped me land my first developer role within months.",
  },
  {
    name: 'Mba Nnenna',
    src: placeholder,
    designation: 'Fullstack Developer',
    year: '2023',
    quote:
      "The community's collaborative environment is amazing. I've learned as much from peer code reviews as from the courses. It's not just about learning to code, it's about growing together as developers.",
  },
  {
    name: 'Victor Josiah',
    src: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1731780038690/39998319-c8be-4010-815d-548468ed5d20.jpeg?auto=compress,format&format=webp',
    designation: 'Backend Developer',
    year: '2022',
    quote:
      "Unclebigbay's teaching style made complex concepts easy to understand. The community support and regular hackathons helped me build a strong portfolio that impressed employers.",
  },
  {
    name: 'Sarah Johnson',
    src: placeholder,
    designation: 'Software Engineer',
    year: '2023',
    quote:
      'What started as a coding course turned into a career transformation. The combination of structured learning, community support, and real-world projects prepared me for the industry.',
  },
];

export const TestimonialSection = () => {
  return (
    <section className="py-[128px]">
      <HomeSectionHeading
        heading={
          <>
            Student Success <br className="md:hidden" />
            <span className="relative whitespace-nowrap">
              Stories
              <CurlyDraw />
            </span>
          </>
        }
        copy="Hear from my students about their learning journey, career transitions, and how our structured courses and mentorship helped them achieve their goals in tech."
      />
      <hr className="pb-1 invisible" />
      <AnimatedTestimonials autoplay testimonials={animatedTestimonialsData} />
    </section>
  );
};
