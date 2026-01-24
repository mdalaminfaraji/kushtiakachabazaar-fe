import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      documentId
      name
      name_bn
      slug
      image {
        url
      }
      subCategories {
        documentId
        name
        name_bn
        slug
        image {
          url
        }
        childCategories {
          documentId
          name
          name_bn
          slug
          image {
            url
          }
        }
      }
    }
  }
`;
