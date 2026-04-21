import { gql } from "@apollo/client";


export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      documentId
      name
      name_bn
      slug
      price
      discountPrice
      unit
      description
      description_bn
      inStock
      stock
      isPopular
      isFlashSale
      flashSaleEndDate
      image {
        url
      }
      images {
        url
      }
      category {
        name
        slug
      }
      subCategory {
        name
        slug
      }
      childCategory {
        name
        slug
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    products(filters: { slug: { eq: $slug } }) {
      documentId
      name
      name_bn
      slug
      price
      discountPrice
      unit
      description
      description_bn
      inStock
      stock
      isPopular
      isFlashSale
      flashSaleEndDate
      image {
        url
      }
      images {
        url
      }
      category {
        documentId
        name
        name_bn
        slug
      }
      subCategory {
        documentId
        name
        name_bn
        slug
      }
      childCategory {
        documentId
        name
        name_bn
        slug
      }
      brand {
        documentId
        name
        slug
      }
    }
  }
`;


// interface PaginationArg {
//   limit?: number;
//   start?: number;
//   page?: number;
//   pageSize?: number;
// }

export const GET_NECESSARY_PRODUCTS_LISTS = gql`
query NecessaryProductsLists($pagination: PaginationArg) {
  necessaryProductsLists(pagination:$pagination) {
  documentId
  name
  englishName
  isPricePerPiece
  pieceOptions
  unit
  isAvailable
  pricePerKg
  pricePerPiece
  quantityOptions
  }
}`;