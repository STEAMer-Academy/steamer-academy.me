// src/components/ContentRenderer.tsx
import React from 'react';

type ContentRendererProps = {
  content: string;
};

export default function ContentRenderer({ content }: ContentRendererProps) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

