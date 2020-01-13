import gql from 'graphql-tag';

export const GET_EXAM_SETTING_LIST = gql`
  query acexamsettingList {
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
    }
  }
`;
