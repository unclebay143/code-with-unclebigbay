'use client';
import { Button } from '@/components/ui/Button';
import { Edit2 } from 'lucide-react';
import React from 'react';
import type { Session } from 'next-auth';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

type Props = {
  //   session: Session | null;
  name: string;
  email: string;
  image: string;
};

const UserSettings = () => {
  const { data: session } = useSession();
  const user = session?.user as Props;
  return (
    <div className="flex flex-col gap-10 lg:w-[80%] ">
      <section className="flex flex-col gap-4  justify-stretch float-right">
        <h1 className="font-semibold">Profile Picture</h1>
        <div className="flex flex-col items-start">
          <Image
            src={user?.image}
            alt={user?.name}
            width={200}
            height={200}
            className="rounded-full"
          />
          <Button className="bg-slate-100 text-slate-600 flex items-center px-4 py-1.5 rounded-md ">
            <Edit2 />
            Edit
          </Button>
          {/* This was intended to ask users for choice of edit, please review */}
          {/* <DropdownMenu>
            <ul>
              <li>Upload</li>
              <li>Remove</li>
            </ul>
          </DropdownMenu> */}
        </div>
      </section>
      <section className="flex flex-col gap-10 pb-16">
        <div className="flex flex-col gap-5 rounded-md p-2 border">
          <div>
            <h1 className="font-semibold">Name</h1>
            <p className="opacity-60">
              This will be your display name for other users
            </p>
          </div>
          <input
            type="text"
            name=""
            id=""
            value={user?.name}
            className="bg-slate-100 text-slate-600 p-2 w-[100%] outline-none border border-slate-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-5 rounded-md p-2 border">
          <div>
            <h1 className="font-semibold">Email</h1>
            <p className="opacity-60">
              This will be your display email address for other users
            </p>
          </div>
          <input
            type="text"
            value={user?.email}
            className="bg-slate-100 text-slate-600 p-2 w-[100%] outline-none border border-slate-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-5 rounded-md p-2 border">
          <div>
            <h1 className="font-semibold">Stack</h1>
            <p className="opacity-60">Select your stack</p>
          </div>
          <select
            name="stack"
            id="stack"
            value="stack"
            className="p-2 border bg-slate-100 rounded-md outline-none"
          >
            <option>Frontend</option>
            <option>Backend</option>
          </select>
        </div>
        <div className="flex flex-col gap-5 rounded-md p-2 border">
          <div>
            <h1 className="font-semibold">Location</h1>
            <p className="opacity-60">
              Select your current country of residence
            </p>
          </div>
          <select
            name="country"
            id=""
            className="p-2 border bg-slate-100 rounded-md outline-none"
          >
            {/* free country endpoint will be map through to display all the countries */}
            <option>Argentina</option>
            <option>Brazil</option>
            <option>Nigeria</option>
          </select>
        </div>
        <div className="flex flex-col gap-5 rounded-md p-2 border">
          <div>
            <h1 className="font-semibold">Social Media</h1>
            <p className="opacity-60">
              This will be your display social media link for other users to
              visit
            </p>
          </div>
          <div>
            <label htmlFor="github" className="opacity-60 font-medium">
              GitHub URL
            </label>
            <input
              type="text"
              name="github"
              className="bg-slate-100 text-slate-600 p-2 w-[100%] outline-none border border-slate-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="linkedIn" className="opacity-60 font-medium">
              LinkedIn URL
            </label>
            <input
              type="text"
              name="linkedIn"
              className="bg-slate-100 text-slate-600 p-2 w-[100%] outline-none border border-slate-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="twitter" className="opacity-60 font-medium">
              Twitter URL
            </label>
            <input
              type="text"
              name="twitter"
              className="bg-slate-100 text-slate-600 p-2 w-[100%] outline-none border border-slate-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="hashnode" className="opacity-60 font-medium">
              Hashnode URL
            </label>
            <input
              type="text"
              name="hashnode"
              className="bg-slate-100 text-slate-600 p-2 w-[100%] outline-none border border-slate-300 rounded-md"
            />
          </div>
        </div>
        <Button className="bg-green-800 text-white font-medium py-1.5 rounded-md  lg:w-[25%] hover:bg-green-700 duration-300">
          Update
        </Button>
      </section>
    </div>
  );
};

export default UserSettings;
