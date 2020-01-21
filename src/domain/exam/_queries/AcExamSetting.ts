import gql from 'graphql-tag';

export const ACEXAMLIST = gql`
  query {
    acExamSettings {
      id
      examName
      action
      sbjct
      examDate
      departmnt
      bctch
      sectn
      st
      ed
      subExamDate
      countvalue
    }
  }
`;
