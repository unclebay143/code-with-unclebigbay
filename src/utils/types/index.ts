import { LucideIcon } from 'lucide-react';

// export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Audit = {
  _id?: string;
  type: string;
  studentId: string;
  createdAt?: string;
  title: string;
  description?: string;
  url?: string;
};

export type Audits = Audit[];

export type Activity = {
  type?: string;
  date: number;
  title: string;
  description?: string;
};

export type Overview = {
  id: string;
  label: string;
  Icon: LucideIcon;
  count: number;
  active?: boolean;
  setCurrentCourse?: Function;
};
export type Overviews = Overview[];

export type CommunityMember = {
  name: string;
  stack: string;
  username: string;
  photo: string;
  totalScore: number;
  flag: string;
  rank: number;
};

export type CommunityMembers = CommunityMember[];

export type Option = {
  _id?: string;
  option: string;
  isCorrect?: boolean;
};
export type Options = Option[];

export type Tag = {
  _id?: string;
  name: string;
  slug: string;
  logo?: string;
  wiki?: string;
};

export type Tags = Tag[];

export type Question = {
  _id?: string;
  question: string;
  options: Options;
  answerExplanation?: string;
  tags?: Tags;
};
export type NewQuestion = {
  _id?: string;
  question: string;
  options: Options;
  answerExplanation?: string;
  tags?: Tags;
};

export type Questions = Question[];

export type Assignment = {
  _id?: string;
  course?: Course;
  questions: Questions;
  alreadyResponded: boolean;
};
export type Assignments = Assignment[];

export type AssignmentResponse = {
  student: string;
  course: string;
  assignment: string;
  response: {
    question: string;
    answer: string;
  }[];
};

export type Student = {
  _id: string;
  createdAt: string;
  totalScore: number;
  fullName: string;
  email: string;
  username: string;
  bio: string;
  socials: {
    portfolio: string;
    blog: string;
    github: string;
    x: string;
    facebook: string;
    mastodon: string;
    thread: string;
    stackoverflow: string;
    linkedin: string;
    youtube: string;
    instagram: string;
  };
  stack: string;
  photo: string;
  isPro: boolean;
  accountOnHold: boolean;
  isBanned: boolean;
  isAnonymous: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  nationality: string;
  state: string;
  location: string;
  gender: string;
  interests: string;
  betaFeatures: {
    [key: string]: boolean;
  };
};

export type Students = Student[];

export type Course = {
  _id: string;
  createdAt?: string;
  type?: string;
  title: string;
  slug: string;
  description: string;
  brief: string;
  ytVideoId: string;
  coverImageUrl: string;
  viewTime: number;
  tags: Tags;
  assignment: Assignment;
  isCompleted: boolean;
  hasAttemptedAssignment: boolean;
  completionDate?: string;
  isEnrolled: boolean;
  enrolledDate?: string;
  enrolledStudentsCount?: number;
};

export type Courses = Course[];

export type LeaderBoardData = {
  _id?: string;
  student: Student;
  totalScore: number;
  rank: number;
};

export type LeaderBoard = LeaderBoardData[];

export type Hackathon = {
  _id: string;
  name: string;
  hashTag: string;
  participantCount: number;
  coverImage: string;
  desktopCoverImage: string;
  ogImage: string;
  title: string;
  brief: string;
  slug: string;
  startDate: string;
  endDate: string;
  about: string;
  whatToBuild: string;
  howToParticipate: string[];
  judges: {
    _id: string;
    name: string;
    title: string;
    photo: string;
    socialLink: string;
  }[];
  judgingCriteria: { heading: string; copy: string }[];
  prizes: { _id: string; label: string; prizes: string[] }[];
  sponsors: { _id: string; name: string; photo: string; link: string }[];
  status: { label: string; reason: string };
  isActive: boolean;
  tags: string[];
  resources: [{ label: string; url: string }];
  schedules: [{ heading: string; date: string }];
  participants: {
    _id: number;
    fullName: string;
    stack: string;
    username: string;
    photo: string;
    isAnonymous: boolean;
    isAdmin: boolean;
  }[];
};

export type Hackathons = Hackathon[];

export type HackathonSubmission = {
  hackathon: string;
  student: string;
  project: {
    name: string;
    url: string;
    demoUrl: string;
    articleUrl: string;
    repositoryUrl: string;
    socialUrl: string;
  };
  feedback: string;
};

export type Country = {
  name: { common: string };
};

export type Countries = Country[];

export type Quote = {
  _id: string;
  quote: string;
  isReleased: boolean;
  releasedDate: Date;
};
