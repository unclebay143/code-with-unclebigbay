import { allHackathons } from '@/utils/consts/all-hackathons';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AllHackathons() {
  const [hackathons, setHackathons] = useState(allHackathons);

  return (
    <section>
      <div className="grid grid-cols-3 gap-4 justify-start items-start mt-3">
        {hackathons && hackathons.length > 0 ? (
          hackathons.map((hackathon, index) => (
            <section
              key={index}
              className="flex flex-col  gap-3 border border-slate-200 rounded-md hover:border-slate-400  w-[300px] h-[300px] odd:bg-[#FFF] even:bg-slate-50 pb-6"
            >
              <Link
                href={`/dashboard/hackathons/hackathon-name/submissions/${index}`}
                className="h-32 w-full overflow-hidden cursor-pointer "
              >
                <Image
                  src={hackathon.coverimage}
                  alt={hackathon.name}
                  width={500}
                  height={500}
                  priority
                  className="rounded-t-md h-full w-full"
                />
              </Link>
              <div className="flex flex-col gap-5 p-5 ">
                <p className="text-slate-600 text-sm ">{hackathon.title}</p>
                <section className="flex justify-between items-center">
                  <div className="flex gap-2 items-center text-slate-500 text-xs">
                    <p>By</p>
                    <div className="h-7 w-7 overflow-hidden rounded-full hover:opacity-90">
                      <Image
                        src={hackathon.profileimage}
                        alt={hackathon.name}
                        width={90}
                        height={90}
                        priority
                      />
                    </div>
                    <p> {hackathon.name}</p>
                  </div>
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://dub.sh/LJOPAON"
                    className="text-slate-400 flex justify-end cursor-pointer hover:text-slate-600 px-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </section>
              </div>
            </section>
          ))
        ) : (
          <div className="text-xl text-center text-slate-600">
            Hello, Our first hackathon will kick off soon...
          </div>
        )}
      </div>
    </section>
  );
}
