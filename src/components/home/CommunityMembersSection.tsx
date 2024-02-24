import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// import { handleAuthentication } from '@/utils/auth';
// import { Button } from '../ui/Button';
import { HomeSectionHeading } from '.';
import { baseURL } from '../../../frontend.config';

type ResponseData = {
  message: string;
  students: {
    id: string;
    username: string;
    photo: string;
    fullName: string;
    stack: string;
  }[];
};

async function getStudents() {
  try {
    console.log({ baseURL });
    const url = `${baseURL}/api/student/get-students`;
    console.log({ url });
    const urlTest =
      'https://codewithunclebigbay.vercel.app/api/student/get-students';
    const result = await fetch(urlTest, {
      cache: 'force-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!result.ok) {
      console.log(result.statusText);
    }

    return result.json();
  } catch (error) {
    console.log({ error });
  }
}

export const CommunityMembersSection = async () => {
  const data: ResponseData = await getStudents();
  const { students } = data;
  return (
    <section className="flex flex-col gap-14">
      <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-4">
        <HomeSectionHeading
          heading={
            <>
              You are in <br className="md:hidden" />
              <span className="relative text-slate-600 whitespace-nowrap">
                good company
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute top-3/4 left-0 h-[0.6em] w-full fill-slate-500/60"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                </svg>
              </span>
            </>
          }
          copy="Join thousands of aspiring developers on a journey to mastering
                web development in 2024."
        />
        {/* Todo: This won't work bcos this component is ss - Convert to link to redirect to login page (if login page is created) */}
        {/* 
        
        <Button
          appearance="secondary-slate"
          onClick={() => handleAuthentication()}
        >
          Become a Member
        </Button> */}
      </div>
      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-8">
        {students.map(({ id, fullName, username, stack, photo }) => (
          <article
            key={`communityMembers-${id}`}
            className="flex flex-col gap-3"
          >
            <div className="mx-auto rounded-full overflow-hidden h-20 w-20 transition transform duration-500 ease-in-out hover:scale-125 hover:-rotate-3">
              <Image
                src={photo}
                height={80}
                width={80}
                className="w-full h-full"
                alt=""
              />
            </div>
            <Link href={`/@${username}`} className="text-center text-sm">
              <h3 className="font-medium text-slate-950 hover:(text-white bg-black)">
                {fullName}
              </h3>
              <p className="font-semibold text-slate-800">{stack}</p>
            </Link>
          </article>
        ))}
      </section>
    </section>
  );
};
