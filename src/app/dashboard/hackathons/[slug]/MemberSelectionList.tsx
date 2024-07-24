import { Student } from '@/utils/types';
import { Avatar, Delete, IconButton } from '@hashnode/matrix-ui';
import Image from 'next/image';
import React from 'react';

type Props = {
  member: Student;
  removeFromSelection: ({ username }: { username: string }) => void;
};

export const MemberSelectionList = ({ member, removeFromSelection }: Props) => {
  const { username, fullName, photo } = member;
  return (
    <section className="group flex items-center gap-2">
      <div className="relative flex justify-center items-center">
        <div className="hidden group-hover:flex absolute z-10 bg-slate-50/80 h-8 w-8 rounded-full overflow-hidden items-center justify-center">
          <IconButton
            onClick={() => removeFromSelection({ username })}
            type="button"
            size="lg"
            Icon={() => (
              <span className="text-red-500">
                <Delete size="sm" />
              </span>
            )}
          />
        </div>

        <Avatar size="sm">
          <Image src={photo} width={32} height={32} alt="" />
        </Avatar>
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-medium text-slate-700">{fullName}</p>
        <span className="text-xs text-slate-500">{username}</span>
      </div>
    </section>
  );
};
