// graphql/queries.ts
import { gql } from '@apollo/client';

export const SEARCH_PLANTS = gql`
  query searchPlants($query: String!) {
    searchPlants(query: $query) {
      id
      common_name
      scientific_name
      image_url
    }
  }
`;
