import gql from 'graphql-tag';

export const AcExamSetting = gql`
  fragment acExamSetting on AcExamSetting {
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
`;
