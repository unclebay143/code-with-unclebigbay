import React from 'react';
import Markdown from 'react-markdown';

type Props = { markdown: string; styles?: string };

export const MarkdownRender = ({ markdown, styles }: Props) => {
  return <Markdown className={styles}>{markdown}</Markdown>;
};
