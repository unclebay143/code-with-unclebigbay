export type Material = {
  title: string;
  description: string;
  url: string;
  type: 'video' | 'post';
  coverImageURL: string;
};

export type Materials = Material[];
