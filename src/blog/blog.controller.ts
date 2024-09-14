// src/blog/blog.controller.ts
import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('posts')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const post = this.blogService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
}
