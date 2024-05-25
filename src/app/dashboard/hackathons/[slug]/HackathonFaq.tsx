'use client';

import React, { useState } from 'react';

const faqs = [
  { q: 'Who can participate in this hackathon?', a: 'Everyone' },
  { q: 'Who can participate in this hackathon?', a: 'Everyone' },
  { q: 'Who can participate in this hackathon?', a: 'Everyone' },
  { q: 'Who can participate in this hackathon?', a: 'Everyone' },
  { q: 'Who can participate in this hackathon?', a: 'Everyone' },
];

const FaqCard = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen((prevOpen) => !prevOpen)}
        type="button"
        className="flex items-center justify-between w-full p-5 font-medium text-slate-600 border border-b-0 border-gray-200 last-of-type:border-b first-of-type:rounded-t-xl hover:bg-slate-50 gap-3"
      >
        <span>
          {index + 1}: {q}
        </span>
        <svg
          className={`w-3 h-3 ${open && 'rotate-180'} shrink-0`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
      {open ? (
        <div className={`p-5 border border-b-0`}>
          <p className="mb-2 text-slate-600">{a}</p>
        </div>
      ) : null}
    </>
  );
};

export const HackathonFaqs = () => {
  return (
    <div>
      {faqs.map(({ q, a }, index) => (
        <FaqCard a={a} q={q} key={q} index={index} />
      ))}
    </div>
  );
};
