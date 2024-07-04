'use client';

import { Button } from '@hashnode/matrix-ui';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { useHackathonById } from '@/components/hooks/useHackathon';
import { formatStartAndEndDate, renderer } from '@/utils/date';
import { Hackathon } from '@/utils/types';
import { Calendar, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Countdown from 'react-countdown';
import { hasHackathonEnded } from '@/utils';
import { AuthModal } from '@/components/atoms/AuthModal';
import { baseURL } from '../../../../../frontend.config';

export const HackathonCard = ({
  hackathon,
  isRegistered,
}: {
  hackathon: Hackathon;
  isRegistered: boolean;
}) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const {
    _id: hackathonId,
    coverImage,
    desktopCoverImage,
    brief,
    title,
    tags,
    startDate,
    endDate,
    participantCount,
    slug,
  } = hackathon;

  const { data: currentStudent } = useCurrentStudent();
  const studentId = currentStudent?._id!;
  const { joinHackathon, isJoinHackathonPending } =
    useHackathonById(hackathonId);

  const isClosed = hasHackathonEnded(endDate);

  console.log(isClosed);

  const [registered, setRegistered] = useState(isRegistered);
  const hackathonUrl = `${baseURL}/hackathons/${slug}`;

  const disableJoinBtn = registered || isJoinHackathonPending || isClosed;

  console.log({ isRegistered, isJoinHackathonPending, isClosed });

  const handleJoinHackathon = () => {
    if (!studentId && hackathonUrl) {
      return setShowAuthModal(true);
    }

    joinHackathon({
      hackathonId,
      studentId,
    })
      .then(() => {
        setRegistered(true);
      })
      .catch((error) => {
        if (error.response.data.message === 'Already registered.') {
          setRegistered(true);
        }
      });
  };

  return (
    <section
      className="hover:bg-slate-50 flex flex-col sm:flex-row pb-5 sm:pb-0 border rounded-lg overflow-hidden"
      key={`hackathon-card-${title}`}
    >
      <section className="grow flex flex-col sm:flex-row gap-1">
        <Link
          href={`hackathons/${slug}`}
          className="relative min-h-[150px] sm:min-h-[100px] sm:w-[300px] md:w-[270px] xl:w-[190px] h-full border-r overflow-hidden"
        >
          <Image src={coverImage} alt="" fill className="sm:hidden" />
          <Image
            src={desktopCoverImage}
            alt=""
            fill
            className="hidden sm:block"
          />
        </Link>
        <section className="p-5 flex flex-col justify-between gap-2">
          <section className="flex flex-col gap-1.5">
            <div className="flex flex-col gap-1 items-start">
              <div className="flex flex-col lg:flex-row gap-1 lg:items-center">
                {participantCount > 5 ? (
                  <>
                    <span className="text-sm text-slate-600 flex items-center gap-1">
                      <Users size={14} />
                      Participants {participantCount}
                    </span>
                    <span className="mx-1 hidden lg:inline">&middot;</span>
                  </>
                ) : null}
                <span className="text-blue-500 text-sm font-medium flex items-center gap-1">
                  <Calendar size={14} />
                  {formatStartAndEndDate(startDate, endDate)}
                </span>
              </div>
              <Link
                href={`hackathons/${slug}`}
                className="font-semibold text-slate-700 hover:text-slate-600"
              >
                {title}
              </Link>
            </div>

            <p className="text-sm font-medium text-slate-500 w-full max-w-[565px]">
              {brief}
            </p>
          </section>
          <div className="flex flex-col w-fit min-[340px]:flex-row gap-2 sm:items-center">
            <Button
              size="xs"
              disabled={disableJoinBtn}
              onClick={handleJoinHackathon}
              appearance="primary-slate"
            >
              {registered ? 'Joined!' : 'Join hackathon'}
            </Button>
            <Button size="xs" appearance="secondary-slate" asChild>
              <Link href={`hackathons/${slug}`}>View details</Link>
            </Button>
          </div>
          {tags?.map((tag, index) => (
            <section key={index}>
              <span className="px-2 py-0.5 capitalize rounded-full bg-indigo-100/20 text-slate-600 text-xs border">
                {tag}
              </span>
            </section>
          ))}
        </section>
      </section>
      <section className="px-5 hidden md:flex flex-col justify-center items-center text-center border-l whitespace-nowrap min-w-[112px]">
        {isClosed ? (
          <h3 className="font-bold text-xl text-slate-600">Ended</h3>
        ) : (
          <div className="flex items-center flex-col gap-2 text-slate-600">
            <Clock size={20} />
            <Countdown date={new Date(endDate)} renderer={renderer} />
          </div>
        )}
      </section>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          close={() => setShowAuthModal(false)}
          type="login"
          nextUrl={hackathonUrl}
        />
      )}
    </section>
  );
};
