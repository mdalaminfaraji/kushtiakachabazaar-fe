
import { gql  } from "@apollo/client";

export const GET_BLOGS = gql`
query Blogs {
  blogs {
    title_bn
    title
    content
    content_bn
    documentId
    featured
    slug
    viewCount
   author
   author_bn
   category {
    name
    description
   }  
  }
}
`;

export const GET_BLOG = gql`
query BlogBySlug($slug: String!) {
  blogs(filters: { slug: { eq: $slug } }) {
    documentId
    title
    slug
    publishedDate
    featuredImage {
      documentId
      url
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
