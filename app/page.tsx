// app/page.tsx
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to NestJS with Next.js!</h1>
      <p>This is the Next.js frontend served by NestJS.</p>
      <Link href="/posts">View Posts</Link>
    </div>
  );
}
