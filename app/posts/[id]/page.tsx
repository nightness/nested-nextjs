export const dynamic = 'force-dynamic';

// app/posts/[id]/page.tsx
import React from 'react';
import { getBaseUrl } from '../../utils/getBaseUrl';
import { Post } from '../../types/Post';
import styles from '../posts.module.css';

interface PostPageProps {
  params: { id: string };
}

// Fetch single post data from the API
async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/posts/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.statusText}`);
    }
    const data = (await res.json()) as Post;
    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Define the PostPage component
export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.id);

  if (!post) {
    // Optionally, you can return a 404 page here
    return (
      <div className={styles.container}>
        <h1>Post Not Found</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
