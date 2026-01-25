
import { gql  } from "@apollo/client";

export const GET_BLOGS = gql`
query Blogs {
  blogs {
    documentId
    title
    title_bn
    slug
    excerpt
    excerpt_bn
    content
    content_bn
    author
    author_bn
    featured
    viewCount
    readingTime
    publishedDate
    featuredImage {
      documentId
      url
      alternativeText
    }
    category {
      documentId
      name
      name_bn
      slug
    }
    tags {
      documentId
      name
      name_bn
      slug
    }
  }
}
`;

export const GET_BLOG = gql`
query BlogBySlug($slug: String!) {
  blogs(filters: { slug: { eq: $slug } }) {
    documentId
    title
    title_bn
    slug
    excerpt
    excerpt_bn
    content
    content_bn
    author
    author_bn
    featured
    viewCount
    readingTime
    publishedDate
    featuredImage {
      documentId
      url
      alternativeText
    }
    category {
      documentId
      name
      name_bn
      slug
    }
    tags {
      documentId
      name
      name_bn
      slug
    }
  }
}
`;

export const GET_BLOG_CATEGORIES = gql`
query BlogCategories {
  blogCategories {
    documentId
    name
    name_bn
    slug
    description
    description_bn
  }
}
`;

export const GET_BLOG_TAGS = gql`
query BlogTags {
  blogTags {
    documentId
    name
    name_bn
    slug
  }
}
`;
