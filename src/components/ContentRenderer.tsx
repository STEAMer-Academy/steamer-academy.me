// src/components/ContentRenderer.tsx
import React from 'react';
import http from 'http';

type ContentRendererProps = {
  content: string;
};

export default function ContentRenderer({ content }: ContentRendererProps) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

const server = http.createServer();
server.maxHeadersCount = 0; // No limit on headers count

