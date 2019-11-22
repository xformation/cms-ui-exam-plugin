import gql from 'graphql-tag';

export const TYPE_OF_GRADINGS = gql`
query{ 
  typeOfGradings {
    id,
    minMarks,
    maxMarks,
    grades,
    groupvalue,
  }
}

`;
