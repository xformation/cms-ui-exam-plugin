import gql from 'graphql-tag';

export const GET_BATCH_LIST = gql`
  query {
    getBatchList {
      id
      batch
      department {
        id
      }
    }
  }
`;
