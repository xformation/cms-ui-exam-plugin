import gql from 'graphql-tag';

export const ACEXAMLISTS = gql`
  query {
    acExamSettings {
      id
      examName
      action
      sbjct
      examDate
      departmnt
      bctch
      brnch
      sectn
      st
      ed
      subExamDate
      countvalue
      total
      passing
      semester
      startTime
      endTime
    }
  }
`;
