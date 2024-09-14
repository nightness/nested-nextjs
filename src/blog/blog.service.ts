// src/blog/blog.service.ts
import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class BlogService {
  private posts: Post[] = [
    { id: 1, title: 'First Post', content: 'This is the first blog post.' },
    { id: 2, title: 'Second Post', content: 'This is the second blog post.' },
    // ... more posts
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post | undefined {
    return this.posts.find((post) => post.id === id);
  }
}
