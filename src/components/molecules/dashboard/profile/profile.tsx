'use client';

import { Button } from '@/components/atoms/Button';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import React from 'react';
import Image from 'next/image';
import { X } from '@/components/icons/X';
import { YouTubeBlackAndWhite } from '@/components/icons/YouTubeBlackAndWhite';
import { LinkedIn } from '@/components/icons/LinkedIn';
import Link from 'next/link';

const Profile = () => {
  const { data: user } = useCurrentStudent();
  const fullName = user?.fullName;
  const photo = user?.photo;

  return (
    <WhiteArea border>
      <div className="flex flex-col gap-6">
        <WhiteArea border>
          <section className="flex justify-between">
            <div className="flex item-center gap-2">
              {photo ? (
                <Image
                  src={photo}
                  alt={fullName || ''}
                  width={120}
                  height={60}
                  className="rounded-full"
                />
              ) : null}
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="font-bold">{fullName}</h2>
                  <p className="opacity-60">Frontend development</p>
                </div>

                <div>
                  <Button>Hire me</Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-end">
              <h3 className="font-bold">
                <span className="opacity-70">Total Point : </span> 1890
              </h3>
              <Link href="/dashboard/settings">
                <Button>Edit</Button>
              </Link>
            </div>
          </section>
        </WhiteArea>

        <WhiteArea border>
          <div className="flex justify-between font-medium">
            <div className="flex gap-10">
              <a href="">
                <X />
              </a>
              <a href="">
                <YouTubeBlackAndWhite />
              </a>
              <a href="">
                <LinkedIn />
              </a>
              <a href="">
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>

            <h3 className="opacity-70">FCT, Abuja, Nigeria.</h3>

            <h3>
              <span className="opacity-70">Joined March, </span>
              2024
            </h3>
          </div>
        </WhiteArea>

        <WhiteArea border>
          <h2 className="font-bold mb-3">Visit my blog at</h2>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              {photo ? (
                <Image
                  src={photo}
                  alt={fullName || ''}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
              ) : null}
              <div>
                <h2 className="font-mono font-semibold">Dev-Blogs</h2>
                <a
                  className="opacity-80 text-blue-400 hover:underline"
                  href="https://medium.com/@eedrisharuna3"
                >
                  https://medium.com/@eedrisharuna3
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-mono font-semibold">Portfolio</h2>
              <a
                className="opacity-80 text-blue-400 hover:underline"
                href="https://harunaidrisportfolio.vercel.app/"
              >
                https://harunaidrisportfolio.vercel.app/
              </a>
            </div>
          </div>
        </WhiteArea>

        <WhiteArea border>
          <h2 className="font-bold mb-3">Checkout my projects</h2>
          <section className="flex flex-col gap-8">
            <WhiteArea border>
              <div className="font-medium">
                <p>
                  <span className="opacity-70">Tittle</span> : Todoist
                </p>
                <p>
                  <span className="opacity-70">Description</span> : Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Aliquam aliquid
                  quaerat itaque
                </p>
              </div>
              <div className="flex gap-3">
                <span className="opacity-70 font-medium">Demo : </span>
                <a
                  className="opacity-80 text-blue-400 hover:underline"
                  href="https://todoistwebapp.vercel.app/"
                >
                  https://todoistwebapp.vercel.app/
                </a>
              </div>
            </WhiteArea>
            <WhiteArea border>
              <div className="font-medium">
                <p>
                  <span className="opacity-70">Tittle</span> : Todoist
                </p>
                <p>
                  <span className="opacity-70">Description</span> : Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Aliquam aliquid
                  quaerat itaque
                </p>
              </div>
              <div className="flex gap-3">
                <span className="opacity-70 font-medium">Demo : </span>
                <a
                  className="opacity-80 text-blue-400 hover:underline"
                  href="https://todoistwebapp.vercel.app/"
                >
                  https://todoistwebapp.vercel.app/
                </a>
              </div>
            </WhiteArea>
            <WhiteArea border>
              <div className="font-medium">
                <p>
                  <span className="opacity-70">Tittle</span> : Todoist
                </p>
                <p>
                  <span className="opacity-70">Description</span> : Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Aliquam aliquid
                  quaerat itaque
                </p>
              </div>
              <div className="flex gap-3">
                <span className="opacity-70 font-medium">Demo : </span>
                <a
                  className="opacity-80 text-blue-400 hover:underline"
                  href="https://todoistwebapp.vercel.app/"
                >
                  https://todoistwebapp.vercel.app/
                </a>
              </div>
            </WhiteArea>
            <WhiteArea border>
              <div className="font-medium">
                <p>
                  <span className="opacity-70">Tittle</span> : Todoist
                </p>
                <p>
                  <span className="opacity-70">Description</span> : Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Aliquam aliquid
                  quaerat itaque
                </p>
              </div>
              <div className="flex gap-3">
                <span className="opacity-70 font-medium">Demo : </span>
                <a
                  className="opacity-80 text-blue-400 hover:underline"
                  href="https://todoistwebapp.vercel.app/"
                >
                  https://todoistwebapp.vercel.app/
                </a>
              </div>
            </WhiteArea>
          </section>
        </WhiteArea>

        <WhiteArea border>
          <div className="flex flex-col gap-3">
            <h1 className="font-bold">About me</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis nostrum architecto, cupiditate vero minima aliquam
              doloremque vel quia veniam vitae praesentium sint eos harum eius
              ullam. Saepe eum dolorum vitae. doloremque vel quia veniam vitae
              praesentium sint eos harum eius ullam. Saepe eum dolorum vitae.
            </p>
          </div>
        </WhiteArea>
      </div>
    </WhiteArea>
  );
};

export default Profile;
