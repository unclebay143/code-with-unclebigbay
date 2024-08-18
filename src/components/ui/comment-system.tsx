import React from 'react';
import Giscus, {
  AvailableLanguage,
  BooleanString,
  InputPosition,
  Loading,
  Mapping,
  Theme,
} from '@giscus/react';

export const CommentSystem = ({
  id,
  repo,
  repoId,
  categoryId,
  category,
  mapping,
  term,
  reactionsEnabled = '1',
  inputPosition = 'bottom',
  theme = 'light',
  lang = 'en',
  emitMetadata,
  loading = 'eager',
}: {
  id?: string;
  repo: `${string}/${string}`;
  repoId: string;
  categoryId: string;
  category: 'Courses';
  mapping: Mapping;
  term: string;
  reactionsEnabled?: BooleanString;
  inputPosition?: InputPosition;
  theme?: Theme;
  lang?: AvailableLanguage;
  emitMetadata?: BooleanString;
  loading?: Loading;
}) => {
  return (
    <Giscus
      id={id}
      repo={repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping={mapping}
      term={term}
      reactionsEnabled={reactionsEnabled}
      emitMetadata={emitMetadata}
      inputPosition={inputPosition}
      theme={theme}
      lang={lang}
      loading={loading}
    />
  );
};
