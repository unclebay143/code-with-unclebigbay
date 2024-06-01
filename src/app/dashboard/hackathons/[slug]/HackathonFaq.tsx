'use client';

import {
  ChevronUp,
  IconButton,
  MinusCircle,
  Plus,
  PlusCircle,
} from '@hashnode/matrix-ui';
import React, { useState } from 'react';

const faqs = [
  {
    q: 'Who can participate?',
    a: 'The hackathon is open to everyone! We welcome participants of all skill levels.',
  },
  {
    q: 'Do I need a team?',
    a: "You can participate as an individual or a team of up to X people (with only one submission per team).  Working in a team can be a great way to learn from each other and share the workload, but it's not mandatory.",
  },
  {
    q: 'Need help?',
    a: (
      <>
        Head over to the official{' '}
        <a
          href="https://discord.gg/UqEYh7hqtD"
          target="_blank"
          rel="noopener"
          className="underline"
        >
          Discord Server
        </a>{' '}
        and join the hackathon channel! And if you&apos;re more of a Twitter
        person, come say hi to @codewithunclebigbay!
      </>
    ),
  },
];

const FaqCard = ({
  q,
  a,
  index,
}: {
  q: string;
  a: React.ReactNode;
  index: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <article
        onClick={() => setOpen((prevOpen) => !prevOpen)}
        role="button"
        className={`flex items-center justify-between w-full p-5 font-medium text-slate-600 border border-b-0 border-gray-200 last-of-type:border-b ${!open && 'last-of-type:rounded-b-xl'} first-of-type:rounded-t-xl hover:bg-slate-50 gap-3 ${open && 'last-of-type:rounded-b-none bg-slate-50/60'}`}
      >
        <span>
          {index + 1}: {q}
        </span>

        <IconButton Icon={open ? MinusCircle : PlusCircle} size="sm" />
      </article>
      <div
        className={`${open ? 'block' : 'hidden'} p-5 border border-b-0 last-of-type:border-b last-of-type:border-t-0 last-of-type:rounded-b-xl`}
      >
        <p className="mb-2 text-slate-600">{a}</p>
      </div>
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
