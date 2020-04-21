import gql from 'graphql-tag';

export const ADD_TYPE_OF_GRADING = gql`
  mutation addTypeOfGrading($input: [AddTypeOfGradingInput!]!) {
    addTypeOfGrading(input: $input) {
      typeOfGrading {
        id
        minMarks
        maxMarks
        grades
        groupvalue
      }
    }
  }
`;
