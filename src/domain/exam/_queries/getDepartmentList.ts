import gql from 'graphql-tag';

export const GET_DEPARTMENT_LIST = gql`
  query {
    getDepartmentList {
      id
      name
      description
      deptHead
      branch {
        id
      }
      academicyear {
        id
      }
    }
  }
`;
