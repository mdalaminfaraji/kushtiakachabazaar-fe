// Blog Types
export interface BlogImage {
  documentId: string;
  url: string;
  alternativeText?: string;
}

export interface BlogCategory {
  documentId: string;
  name: string;
  name_bn: string;
  slug: string;
  description?: string;
  description_bn?: string;
}

export interface BlogTag {
  documentId: string;
  name: string;
  name_bn: string;
  slug: string;
}

export interface Blog {
  documentId: string;
  title: string;
  title_bn: string;
  slug: string;
  excerpt: string;
  excerpt_bn: string;
  content: string;
  content_bn: string;
  author: string;
  author_bn: string;
  featured: boolean;
  viewCount: number;
  readingTime?: number;
  publishedDate?: string;
  createdAt?: string;
  featuredImage?: BlogImage;
  category?: BlogCategory;
  tags?: BlogTag[];
}

// GraphQL Response Types
export interface BlogsQueryResponse {
  blogs: Blog[];
}

export interface BlogQueryResponse {
  blogs: Blog[];
}

export interface BlogCategoriesQueryResponse {
  blogCategories: BlogCategory[];
}

export interface BlogTagsQueryResponse {
  blogTags: BlogTag[];
}
