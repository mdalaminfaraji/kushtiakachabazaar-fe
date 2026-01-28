import { gql } from "@apollo/client"



export const GET_NEEDED_PRODUCTS = gql`
 query NecessaryProductsLists($pagination: PaginationArg) {
  necessaryProductsLists(pagination: $pagination) {
  documentId
  name
  englishName
  isPricePerPiece
  pieceOptions
  pricePerKg
  pricePerPiece
  quantityOptions
  }
}
`;
//!TODO: 
// // {
//   "pagination": {
//     "limit": null
//   }
// }