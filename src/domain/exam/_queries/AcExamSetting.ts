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
      startTime
      endTime
      total
      semester
      passing
      ed
      st
      subExamDate
      countvalue
    }
  }
`;
