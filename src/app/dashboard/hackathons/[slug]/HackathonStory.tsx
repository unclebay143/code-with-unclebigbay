'use client';

import React from 'react';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import {
  Button,
  ArrowLeft,
  BrandXTwitter,
  Avatar,
  CalendarBlank,
  Award02,
  BrandYoutube,
} from '@hashnode/matrix-ui';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { Boxes } from '@/components/ui/background-boxes';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitEntryModal } from './SubmitEntryModal';
import { useState } from 'react';
import { Hackathon } from '@/utils/types';

import { useHackathonById } from '@/components/hooks/useHackathon';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { formatStartAndEndDate } from '@/utils/date';
import { handleAuthentication } from '@/utils/auth';
import dayjs from 'dayjs';
import { HackathonFaqs } from './HackathonFaq';
import { hasHackathonEnded } from '@/utils';
import { baseURL } from '../../../../../frontend.config';

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
    slug,
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
    schedules,
    resources,
  } = hackathon;

  const hackathonUrl = `${baseURL}/hackathons/${slug}`;

  const { data: currentStudent } = useCurrentStudent();
  const [hasSubmittedEntry, setHasSubmittedEntry] = useState(hasSubmitted);
  const studentId = currentStudent?._id!;
  const [openSubmitEntryModal, setOpenSubmitEntryModal] = useState(false);
  const {
    joinHackathon,
    isJoinHackathonPending,
    submitEntry,
    isSubmitEntryPending,
  } = useHackathonById(hackathonId);

  const [registered, setRegistered] = useState(isRegistered);

  const isClosed = hasHackathonEnded(endDate);
  const disableSubmitEntryBtn = isClosed;
  const disableRegisterBtn = registered || isClosed || isJoinHackathonPending;

  const animatedTooltipParticipants = participants
    .filter((participant) => !participant.isAnonymous)
    .map((participant) => {
      return {
        id: participant._id,
        name: participant.fullName,
        designation: participant.stack,
        image: participant.photo,
      };
    });

  const handleJoinHackathon = () => {
    if (!studentId && hackathonUrl) {
      return handleAuthentication({ nextUrl: hackathonUrl });
    }

    joinHackathon({
      hackathonId,
      studentId,
    }).then(() => {
      setRegistered(true);
    });
  };

  const sectionHeadingStyle = 'font-semibold text-slate-700 text-xl';
  const uLStyle = 'list-decimal list-outside ml-5 text-slate-600';
  const oLStyle = 'list-disc list-outside ml-5 text-slate-600';

  const showScheduleSection = schedules && schedules.length > 0;
  const showResourceSection = resources && resources.length > 0;
  const showJudgesSection = judges && judges.length > 0;
  const showParticipantSection =
    animatedTooltipParticipants && animatedTooltipParticipants.length > 0;

  const socialShare = `https://twitter.com/intent/tweet?url=
            ${hackathonUrl}&text=I'm excited to publicly announce that I'm participating in the ${name}! %0A%0AJoin in this creative problem-solving. This is going to be epic!`;
  return (
    <WhiteArea border>
      <div className="flex items-center justify-between mb-5 lg:hidden">
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
            <h1 className="md:text-4xl text-xl text-white px-4 text-center">
              {title}
            </h1>
            <span
              className={`${isClosed ? 'text-red-500' : 'text-blue-500'} text-sm font-bold flex items-center gap-1`}
            >
              <CalendarBlank size="sm" />{' '}
              {formatStartAndEndDate(startDate, endDate)}
              {isClosed ? ' (ended)' : null}
            </span>

            <div className="dark">
              {registered ? (
                <>
                  {hasSubmittedEntry ? (
                    <Button size="xs" appearance="primary-slate" disabled>
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
            <section className="max-w-sm text-center">
              {registered ? (
                <p className="text-[12px] text-slate-400">
                  By submitting your entry, you grant us permission to showcase
                  your project on our platform.
                </p>
              ) : (
                <p className="text-[12px] text-slate-400">
                  By registering for this hackathon, you grant us permission to
                  contact you regarding the hackathon.
                </p>
              )}
            </section>
          </section>
        </div>

        <section className="flex flex-col gap-8 mt-5 lg:max-w-[90%]">
          <section className="flex flex-col gap-2">
            <h3 className={sectionHeadingStyle}>About {name}</h3>
            <div
              className="text-slate-500 flex flex-col gap-4"
              dangerouslySetInnerHTML={{ __html: about }}
            />
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
                  <span
                    className="text-slate-500 [&>a]:underline"
                    dangerouslySetInnerHTML={{ __html: how }}
                  />
                </li>
              ))}
            </ul>
          </section>

          {/* Resource Section */}
          {showResourceSection && (
            <section className="flex flex-col gap-2">
              <h3 className={sectionHeadingStyle}>Resources</h3>
              <ul className={oLStyle}>
                {resources.map(({ label, url }) => (
                  <li className="mb-3" key={`howToParticipate-${label}`}>
                    <div className="flex">
                      <Button appearance="link" asChild>
                        <Link href={url} target="_blank" rel="noopener">
                          {label}
                        </Link>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Judges Section */}
          {showJudgesSection && (
            <section className="flex flex-col gap-4">
              <h3 className={sectionHeadingStyle}>Judges</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8">
                {judges.map(({ _id, name, photo, socialLink, title }) => (
                  <a
                    href={socialLink}
                    target="_blank"
                    rel="noopener"
                    className="flex gap-3 items-center"
                    key={`judges-${_id}`}
                  >
                    <div>
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full overflow-hidden">
                        <Image src={photo} alt="" fill />
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-black">{name}</p>
                      <p className="text-slate-500">{title}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

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

          {showScheduleSection && (
            <section className="flex flex-col gap-4">
              <h3 className={sectionHeadingStyle}>Schedules</h3>
              <ul className={uLStyle}>
                {schedules.map(({ heading, date }) => (
                  <li className="mb-3" key={`judgingCriteria-${heading}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                      <span className="text-slate-600 font-semibold">
                        {heading}:
                      </span>
                      <p className="text-slate-500">{date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="flex flex-col gap-4">
            <div className="flex items-center text-slate-700 gap-1">
              <Award02 size="md" />
              <h3 className="font-semibold  text-xl">Prizes</h3>
            </div>
            {/* <div className="hidden md:block overflow-x-auto border rounded-xl">
              <table className="w-full">
                <thead className="rounded-lg">
                  <tr className="text-left border-b bg-slate-50">
                    <th className="rounded-tl-lg text-sm font-medium py-4 px-6">
                      Position
                    </th>
                    <th className="rounded-tr-lg text-sm font-medium py-4 px-6">
                      Prizes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prizes.map(({ _id, label, prizes: _prizes }, index) => (
                    <tr key={_id}>
                      <td
                        className={`px-6 py-4 ${prizes.length !== index + 1 && 'border-b'}`}
                      >
                        <span className="font-medium text-sm text-slate-700">
                          {label}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 ${prizes.length !== index + 1 && 'border-b'}`}
                      >
                        <ul
                          className={`${_prizes.length !== 1 && 'list-disc'} ml-5 gap-1 text-sm text-slate-500 font-medium`}
                        >
                          {_prizes.map((prize) => (
                            <li key={prize}>
                              <span className="font-medium text-sm text-slate-600">
                                {prize}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
            <div className="flex flex-wrap gap-10 ml-2">
              {prizes.map(({ _id, label, prizes }) => (
                <div
                  className="flex flex-col gap-2"
                  key={`prizes-${label}-${_id}`}
                >
                  <p className="font-semibold text-yellow-600">{label}</p>
                  <ul className="list-disc ml-5 gap-1 text-sm text-slate-500 font-medium">
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
                  <Avatar size="4xl" title={name}>
                    <Image src={photo} alt={name} fill />
                  </Avatar>
                </a>
              ))}
            </div>

            <a
              href="https://dub.sh/n6qnahB"
              target="_blank"
              rel="noopener"
              className="inline text-sm text-slate-500 underline hover:text-slate-600"
            >
              Be a sponsor for the next hackathon.
            </a>
          </section>
          {showParticipantSection && (
            <section className="flex flex-col gap-4">
              <h3 className={sectionHeadingStyle}>Participants</h3>
              <section className="flex flex-row flex-wrap gap-y-3">
                <AnimatedTooltip items={animatedTooltipParticipants} />
              </section>
            </section>
          )}
        </section>
        <section className="flex flex-col gap-4 mt-3">
          <h3 className={sectionHeadingStyle}>Frequently asked questions</h3>
          <HackathonFaqs />
        </section>
        {/* <section className="py-10 bg-gradient-to-r from-fuchsia-600 to-blue-600 sm:py-16"> */}
        <section className="mt-10 py-10 bg-gradient-to-r from-slate-600 to-slate-900 sm:py-16 rounded-xl">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="dark text-center flex flex-col gap-4 items-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <h2 className="text-3xl font-bold text-white">
                {isRegistered ? "You're participating" : 'Participate'} in the{' '}
                {hashTag} Hackathon!
              </h2>
              {registered ? (
                <Button
                  appearance="primary-slate"
                  endIcon={BrandXTwitter}
                  asChild
                >
                  <a
                    href={socialShare}
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

        <section className="flex justify-center">
          <AddToCalendarButton
            name={`${title} - CodeWithUnclebigbay`}
            description={about}
            startDate={dayjs(startDate).format('YYYY-mM-D')}
            endDate={dayjs(endDate).format('YYYY-mM-D')}
            options="'Apple','Google','iCal','Outlook.com','Yahoo'"
            timeZone="Africa/Lagos"
            organizer="Code with Unclebigbay|unclebigbay@gmail.com"
            location="World Wide Web"
            size="0"
            buttonStyle="flat"
            trigger="hover"
          />
        </section>
      </section>
      <section className="flex flex-col sm:flex-row items-center justify-center gap-2">
        <a
          href={socialShare}
          target="_blank"
          rel="noopener"
          className="hover:text-slate-600 text-sm text-center text-slate-500 flex items-center gap-1 justify-center"
        >
          <BrandXTwitter size="sm" />
          Share on Twitter
        </a>
        <span className="text-slate-500 hidden sm:inline">&middot;</span>
        <a
          href="https://www.youtube.com/@unclebigbay"
          target="_blank"
          rel="noopener"
          className="hover:text-slate-600 text-sm text-center text-slate-500 flex items-center gap-1 justify-center"
        >
          <BrandYoutube size="sm" />
          Subscribe to channel
        </a>
      </section>
      <SubmitEntryModal
        studentId={studentId}
        hackathonId={hackathonId}
        hackathonName={name}
        isOpen={openSubmitEntryModal}
        close={() => setOpenSubmitEntryModal(false)}
        submitEntry={submitEntry}
        isSubmitEntryPending={isSubmitEntryPending}
        onSubmitEntry={() => setHasSubmittedEntry(true)}
      />
    </WhiteArea>
  );
};
