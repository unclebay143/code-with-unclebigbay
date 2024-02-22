import {
  mapTestimonialSourceToColor,
  mapTestimonialSourceToIcon,
  testimonials,
} from '@/lib/constants/testimonials';
import Image from 'next/image';
import React from 'react';

type Props = {};

const Testimonials = (props: Props) => {
  return (
    <section id="testimonials">
      <div className="mx-auto sm:px-6 lg:px-8 md:px-7">
        <ul role="list">
          {testimonials.map(
            ({ quote, author, src, srcUrl }, testimonialIndex) => (
              <li
                key={testimonialIndex}
                className="transition  mt-6 duration-300 ease-in-out hover:scale-105 last:scale-105 transform"
              >
                {srcUrl ? (
                  <a href={srcUrl} target={'_blank'} rel="noreferrer">
                    <TestimonialCard quote={quote} author={author} src={src} />
                  </a>
                ) : (
                  <TestimonialCard quote={quote} author={author} src={src} />
                )}
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  quote,
  author,
  src,
}: {
  quote: string;
  author: { name: string; title: string; img: string };
  src: string;
}) => {
  return (
    <figure className="relative p-6 shadow-sm hover:ring hover:ring-slate-50 border group rounded-2xl bg-gray-900 shadow-slate-900/10">
      <blockquote className="flex justify-between">
        <p className="text-lg tracking-tight text-gray-200">
          &quot;{quote}&quot;
        </p>
        <span style={{ color: mapTestimonialSourceToColor[src] }}>
          {mapTestimonialSourceToIcon[src]}
        </span>
      </blockquote>
      <figcaption className="relative flex items-center justify-between pt-6 mt-6 border-t border-slate-700">
        <div>
          <div className="justify-start text-base text-slate-300 items- font-display">
            {author.name}
          </div>
          <div className="mt-1 text-sm text-gray-400 capitalize">
            {author.title}
          </div>
        </div>
        <section className="flex items-end">
          <div className="p-0.5 overflow-hidden border border-slate-400 rounded-full bg-slate-50">
            <Image
              className="object-cover rounded-full h-14 w-14"
              src={author.img}
              alt="picture of the testimonial author"
              width={56}
              height={56}
            />
          </div>
        </section>
      </figcaption>
    </figure>
  );
};

export default Testimonials;
