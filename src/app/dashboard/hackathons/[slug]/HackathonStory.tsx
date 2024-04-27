'use client';

import React from 'react';
import { Button, ArrowLeft, BrandXTwitter, Avatar } from '@hashnode/matrix-ui';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { Boxes } from '@/components/ui/background-boxes';
import { Calendar, Medal, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitEntryModal } from './SubmitEntryModal';
import { useState } from 'react';
import { Hackathon } from '@/utils/types';
import { useHackathonById } from '@/components/hooks/useHackathon';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { formatStartAndEndDate } from '@/utils/date';

type HackathonStoryProps = {
  hackathon: Hackathon;
  isRegistered: boolean;
  hasSubmitted: boolean;
};

export const HackathonStory = ({
  hackathon,
  isRegistered,
  hasSubmitted,
}: HackathonStoryProps) => {
  const {
    name,
    hashTag,
    title,
    startDate,
    about,
    howToParticipate,
    endDate,
    judges,
    judgingCriteria,
    whatToBuild,
    prizes,
    participants,
    sponsors,
    _id: hackathonId,
  } = hackathon;

  const { data: currentStudent } = useCurrentStudent();
  const studentId = currentStudent?._id!;
  const [openSubmitEntryModal, setOpenSubmitEntryModal] = useState(false);
  const {
    joinHackathon,
    isJoinHackathonPending,
    submitEntry,
    isSubmitEntryPending,
  } = useHackathonById(hackathonId);
  const [registered, setRegistered] = useState(isRegistered);

  const isClosed = false;
  const disableSubmitEntryBtn = isClosed;
  const disableRegisterBtn = registered || isClosed || isJoinHackathonPending;

  const _participants = participants.map((participant) => {
    return {
      id: participant._id,
      name: participant.fullName,
      designation: participant.stack,
      image: participant.photo,
    };
  });

  const handleJoinHackathon = () => {
    if (studentId) {
      joinHackathon({
        hackathonId,
        studentId,
      }).then(() => {
        setRegistered(true);
      });
    }
  };

  if (!hackathon) {
    return (
      <WhiteArea border>
        <section className="flex min-h-[80vh] items-center justify-center">
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="text-center">
              <p className="text-2xl font-semibold text-slate-700">
                The Hackathon Escaped Us!
              </p>
              <span className="text-slate-500">
                This hackathon isn&apos;t listed, check the link again or
                discover recent hackathons.
              </span>
            </div>
            <div className="flex items-center justify-between mb-5">
              <Button
                size="xs"
                appearance="secondary-slate"
                startIcon={ArrowLeft}
                asChild
              >
                <Link href="/dashboard/hackathons">
                  Discover recent hackathons
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </WhiteArea>
    );
  }

  const sectionHeadingStyle = 'font-semibold text-slate-700 text-xl';
  const uLStyle = 'list-decimal list-outside ml-5 text-slate-600';

  return (
    <WhiteArea border>
      <div className="flex items-center justify-between mb-5">
        <Button
          size="xs"
          appearance="secondary-slate"
          startIcon={ArrowLeft}
          asChild
        >
          <Link href="/dashboard/hackathons">Explore more hackathons</Link>
        </Button>
      </div>
      <section className="flex flex-col gap-3 pb-5">
        <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
          <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
          <section className="flex flex-col items-center gap-3 relative z-20 p-4">
            <h2 className="md:text-4xl text-xl text-white px-4 text-center">
              {title}
            </h2>
            <span
              className={`${isClosed ? 'text-red-500' : 'text-blue-500'} text-sm font-bold flex items-center gap-1`}
            >
              <Calendar size={14} /> {formatStartAndEndDate(startDate, endDate)}
              {isClosed ? '(closed)' : null}
            </span>
            <div className="dark">
              {registered ? (
                <>
                  {hasSubmitted ? (
                    <Button
                      size="xs"
                      appearance="primary-slate"
                      disabled={hasSubmitted}
                    >
                      <span className="font-normal text-xs">
                        Entry submitted
                      </span>
                    </Button>
                  ) : (
                    <Button
                      size="xs"
                      appearance="primary-slate"
                      disabled={disableSubmitEntryBtn}
                      onClick={() => setOpenSubmitEntryModal(true)}
                    >
                      <span className="font-normal text-xs">Submit entry</span>
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  size="xs"
                  appearance="primary-slate"
                  disabled={disableRegisterBtn}
                  onClick={handleJoinHackathon}
                >
                  <span className="font-normal text-xs">Join hackathon</span>
                </Button>
              )}
            </div>
            {!registered && (
              <section className="max-w-sm text-center">
                <p className="text-[12px] text-slate-400">
                  By registering for this hackathon, you grant us permission to
                  contact you regarding the hackathon.
                </p>
              </section>
            )}
          </section>
        </div>

        <section className="flex flex-col gap-8 mt-5">
          <section className="flex flex-col gap-2">
            <h3 className={sectionHeadingStyle}>About {name}</h3>
            <p className="text-slate-500">{about}</p>
          </section>
          <section className="flex flex-col gap-2">
            <h3 className={sectionHeadingStyle}>What to build</h3>
            <p className="text-slate-500">{whatToBuild}</p>
          </section>
          <section className="flex flex-col gap-2">
            <h3 className={sectionHeadingStyle}>How to Participate</h3>
            <ul className={uLStyle}>
              {howToParticipate.map((how) => (
                <li className="mb-3" key={`howToParticipate-${how}`}>
                  <span className="text-slate-500">{how}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col gap-4">
            <h3 className={sectionHeadingStyle}>Judges</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8">
              {judges.map(({ name, photo, socialLink, title }) => (
                <div className="flex gap-3 items-center" key={`judges-${name}`}>
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full overflow-hidden">
                    <Image src={photo} alt="" fill />
                  </div>
                  <a href={socialLink} target="_blank" className="">
                    <p className="text-lg font-semibold text-black">{name}</p>
                    <p className="text-slate-500">{title}</p>
                  </a>
                </div>
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-4">
            <h3 className={sectionHeadingStyle}>Judging criteria</h3>
            <ul className={uLStyle}>
              {judgingCriteria.map(({ heading, copy }) => (
                <li className="mb-3" key={`judgingCriteria-${heading}`}>
                  <div className="inline">
                    <span className="text-slate-600 font-semibold">
                      {heading}
                    </span>
                    <p className="mt-2 text-slate-500">{copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col gap-4">
            <div className="flex items-center text-slate-700 gap-1">
              <Medal size={22} />
              <h3 className="font-semibold  text-xl">Prizes</h3>
            </div>
            <div className="flex flex-wrap gap-10 ml-2">
              {prizes
                .filter((prize) => prize.position !== 0)
                .map(({ _id, position, prizes }) => (
                  <div
                    className="flex flex-col gap-2"
                    key={`prizes-${position}-${_id}`}
                  >
                    <p className="font-semibold text-yellow-600">
                      {position} Place
                    </p>
                    <ul className="list-disc ml-5 gap-1 text-sm text-slate-500 font-medium">
                      {prizes.map((prize) => (
                        <li key={`prizeLi-${prize}`} className="mb-1">
                          {prize}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

              {prizes
                .filter((prize) => prize.position === 0)
                .map(({ _id, position, prizes }) => (
                  <div
                    className="w-full flex flex-col gap-2"
                    key={`prizes-${position}-${_id}`}
                  >
                    <p className="font-semibold text-slate-600">
                      Valid Participants
                    </p>
                    <ul className="list-disc list-inside ml-1 flex flex-col gap-1 text-sm text-slate-500 font-medium">
                      {prizes.map((prize) => (
                        <li key={`prizeLi-${prize}`} className="mb-1">
                          {prize}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </section>

          <section className="flex flex-col gap-4 items-start">
            <h3 className={sectionHeadingStyle}>Sponsors</h3>
            <div className="flex flex-wrap gap-5">
              {sponsors.map(({ _id, name, photo, link }) => (
                <a key={_id} href={link} target="_blank" rel="noopener">
                  <Avatar size="3xl">
                    <Image src={photo} alt={name} fill />
                  </Avatar>
                </a>
              ))}
            </div>
            <a
              href=""
              target="_blank"
              rel="noopener"
              className="inline text-sm text-slate-500 underline hover:text-slate-600"
            >
              Be a sponsor for the next hackathon.
            </a>
          </section>

          <section className="flex flex-col gap-4">
            <h3 className={sectionHeadingStyle}>Participants</h3>
            <section className="flex flex-row flex-wrap gap-y-3">
              <AnimatedTooltip items={_participants} />
            </section>
          </section>

          {/* Todo: you can turn this section into social media sharing CTA after isRegistered is true */}

          {/* <section className="py-10 bg-gradient-to-r from-fuchsia-600 to-blue-600 sm:py-16"> */}
          <section className="mt-10 py-10 bg-gradient-to-r from-slate-600 to-slate-900 sm:py-16 rounded-xl">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="dark text-center flex flex-col gap-4 items-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <h2 className="text-3xl font-bold text-white">
                  {isRegistered ? "You're participating" : 'Participate'} in the
                  Codathon Hackathon!
                </h2>
                {registered ? (
                  <Button
                    appearance="primary-slate"
                    endIcon={BrandXTwitter}
                    asChild
                  >
                    <a
                      href=""
                      target="_blank"
                      rel="noopener"
                      className="whitespace-nowrap"
                    >
                      Share on
                    </a>
                  </Button>
                ) : (
                  <div className="whitespace-nowrap">
                    <Button
                      appearance="primary-slate"
                      onClick={handleJoinHackathon}
                      disabled={registered}
                    >
                      {registered ? 'Joined' : 'Join hackathon'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </section>
      </section>
      <section className="flex items-center justify-center gap-2">
        <a
          href=""
          target="_blank"
          className="hover:text-slate-600 text-sm text-center text-slate-500 flex items-center gap-1 justify-center"
        >
          <Twitter size={14} />
          Share on Twitter
        </a>
        <span className="text-slate-500">&middot;</span>
        <a
          href="https://www.youtube.com/@unclebigbay"
          target="_blank"
          className="hover:text-slate-600 text-sm text-center text-slate-500 flex items-center gap-1 justify-center"
        >
          <Youtube size={14} />
          Subscribe to channel
        </a>
      </section>
      <SubmitEntryModal
        studentId={studentId}
        hackathonId={hackathonId}
        isOpen={openSubmitEntryModal}
        close={() => setOpenSubmitEntryModal(false)}
        submitEntry={submitEntry}
        isSubmitEntryPending={isSubmitEntryPending}
      />
    </WhiteArea>
  );
};
