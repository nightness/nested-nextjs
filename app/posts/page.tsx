export const dynamic = 'force-dynamic';

// app/posts/page.tsx
import React from 'react';
import Link from 'next/link';
import { getBaseUrl } from '../utils/getBaseUrl';
import { Post } from '../types/Post';
import styles from './posts.module.css';

// Fetch posts data from the API
async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/posts`, {
      cache: 'no-store', // Disable caching to fetch fresh data on each request
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }
    const data = (await res.json()) as Post[];
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Define metadata for the page
export const metadata = {
  title: 'Blog Posts',
  description: 'A list of blog posts',
};

// Define the PostsPage component
export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      <h1>Blog Posts</h1>
      {posts.length > 0 ? (
        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.id} className={styles.postListItem}>
              <Link href={`/posts/${post.id}`} className={styles.postLink}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
